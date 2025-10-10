import pandas as pd
from typing import Dict, List, Tuple


def solve_with_py3dbp(container_dims: Dict, products_df: pd.DataFrame) -> Tuple[List[Dict], List[Dict], float]:
    """
    Solves the container packing problem using the py3dbp library.

    Returns (placed_items, unplaced_items, utilization_percent)
    """
    try:
        from py3dbp import Packer, Bin, Item
    except Exception as import_error:  # pragma: no cover - provides graceful fallback when lib missing
        raise RuntimeError(
            "py3dbp is required for this solver. Install with 'pip install py3dbp'."
        ) from import_error

    packer = Packer()

    # Add the container (bin)
    packer.add_bin(Bin(
        'container',
        container_dims['width'],
        container_dims['height'],
        container_dims['length'],
        container_dims['payload']
    ))

    # Add items from the DataFrame
    for _, row in products_df.iterrows():
        for _ in range(int(row['quantity'])):
            packer.add_item(Item(
                str(row.get('name', row.get('sku', 'item'))),
                float(row['width']),
                float(row['height']),
                float(row['length']),
                float(row['weight'])
            ))

    # Run the packing algorithm
    packer.pack(bigger_first=True, distribute_items=False)

    placed_items: List[Dict] = []
    unplaced_items: List[Dict] = []

    # Assuming one bin for simplicity
    bin0 = packer.bins[0]

    for item in bin0.items:
        placed_items.append({
            'name': item.name,
            'position': item.position,  # (w, h, d)
            'width': float(item.width),
            'height': float(item.height),
            'depth': float(item.depth),  # corresponds to length
            'weight': float(item.weight)
        })

    for item in bin0.unfitted_items:
        unplaced_items.append({
            'name': item.name,
            'width': float(item.width),
            'height': float(item.height),
            'depth': float(item.depth),
            'weight': float(item.weight)
        })

    utilization = (bin0.get_total_volume() / bin0.get_volume()) * 100 if bin0.get_volume() > 0 else 0.0

    return placed_items, unplaced_items, float(utilization)


def solve_with_greedy_heuristic(container_dims: Dict, products_df: pd.DataFrame) -> Tuple[List[Dict], List[Dict], float]:
    """
    Simple greedy heuristic: sort items by volume (desc) and place at first available pivot.
    Returns (placed_items, unplaced_items, utilization_percent)
    """
    container_w = float(container_dims['width'])
    container_h = float(container_dims['height'])
    container_l = float(container_dims['length'])
    max_payload = float(container_dims['payload'])

    # Expand products based on quantity
    items: List[Dict] = []
    for _, row in products_df.iterrows():
        for i in range(int(row['quantity'])):
            items.append({
                'name': f"{row.get('name', row.get('sku', 'item'))}_{i+1}",
                'width': float(row['width']),
                'height': float(row['height']),
                'length': float(row['length']),
                'weight': float(row['weight'])
            })

    # Sort by volume desc
    items.sort(key=lambda x: x['width'] * x['height'] * x['length'], reverse=True)

    placed_items: List[Dict] = []
    unplaced_items: List[Dict] = []

    pivot_points: List[Tuple[float, float, float]] = [(0.0, 0.0, 0.0)]
    total_weight = 0.0

    for item in items:
        placed = False
        w, h, l = item['width'], item['height'], item['length']

        for p_idx, p in enumerate(sorted(pivot_points, key=lambda pt: (pt[2], pt[1], pt[0]))):
            px, py, pz = p

            if (
                px + w <= container_w and
                py + h <= container_h and
                pz + l <= container_l and
                total_weight + item['weight'] <= max_payload
            ):
                # collision check
                collision = False
                for placed_item in placed_items:
                    pos = placed_item['position']
                    dim = (placed_item['width'], placed_item['height'], placed_item['depth'])
                    if not (
                        px + w <= pos[0] or px >= pos[0] + dim[0] or
                        py + h <= pos[1] or py >= pos[1] + dim[1] or
                        pz + l <= pos[2] or pz >= pos[2] + dim[2]
                    ):
                        collision = True
                        break

                if not collision:
                    placed_items.append({
                        'name': item['name'],
                        'position': (px, py, pz),
                        'width': w,
                        'height': h,
                        'depth': l,
                        'weight': item['weight']
                    })
                    total_weight += item['weight']

                    # update pivots
                    pivot_points.pop(p_idx)
                    pivot_points.extend([
                        (px + w, py, pz),
                        (px, py + h, pz),
                        (px, py, pz + l)
                    ])
                    # keep valid unique points
                    pivot_points = sorted(list({p for p in pivot_points if p[0] < container_w and p[1] < container_h and p[2] < container_l}))
                    placed = True
                    break

        if not placed:
            unplaced_items.append(item)

    container_volume = container_w * container_h * container_l
    placed_volume = sum(it['width'] * it['height'] * it['depth'] for it in placed_items)
    utilization = (placed_volume / container_volume) * 100 if container_volume > 0 else 0.0

    return placed_items, unplaced_items, float(utilization)


