import plotly.graph_objects as go
from typing import Dict, List
import random


def _color_for_name(name: str) -> str:
    random.seed(name)
    return f"rgb({random.randint(0, 255)}, {random.randint(0, 255)}, {random.randint(0, 255)})"


def draw_3d_plot(container_dims: Dict, placed_items: List[Dict]):
    """
    Render a 3D container and placed items using Plotly.
    """
    fig = go.Figure()

    # Container outline for context
    length = float(container_dims['length'])
    width = float(container_dims['width'])
    height = float(container_dims['height'])

    fig.add_trace(go.Mesh3d(
        x=[0, length, length, 0, 0, length, length, 0],
        y=[0, 0, width, width, 0, 0, width, width],
        z=[0, 0, 0, 0, height, height, height, height],
        i=[7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
        j=[3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
        k=[0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
        opacity=0.05,
        color='blue',
        name='Container'
    ))

    for item in placed_items:
        pos = item['position']  # (w, h, d) from solver
        x0, y0, z0 = pos[2], pos[0], pos[1]  # map to (length, width, height) axes
        dl, dw, dh = float(item['depth']), float(item['width']), float(item['height'])

        fig.add_trace(go.Mesh3d(
            x=[x0, x0 + dl, x0 + dl, x0, x0, x0 + dl, x0 + dl, x0],
            y=[y0, y0, y0 + dw, y0 + dw, y0, y0, y0 + dw, y0 + dw],
            z=[z0, z0, z0, z0, z0 + dh, z0 + dh, z0 + dh, z0 + dh],
            i=[7, 0, 0, 0, 4, 4, 6, 6, 4, 0, 3, 2],
            j=[3, 4, 1, 2, 5, 6, 5, 2, 0, 1, 6, 3],
            k=[0, 7, 2, 3, 6, 7, 1, 1, 5, 5, 7, 6],
            opacity=0.8,
            color=_color_for_name(item['name']),
            hoverinfo='text',
            text=f"{item['name']}<br>Pos: ({x0},{y0},{z0})<br>Dims: ({dl},{dw},{dh})",
            name=item['name']
        ))

    fig.update_layout(
        title='Container Loading Plan',
        scene=dict(
            xaxis_title='Length (cm)',
            yaxis_title='Width (cm)',
            zaxis_title='Height (cm)',
            aspectratio=dict(x=length / max(height, 1e-6), y=width / max(height, 1e-6), z=1)
        ),
        margin=dict(l=0, r=0, b=0, t=40)
    )

    return fig


