import streamlit as st
import pandas as pd
import solver
import visualizer


# --- Page Configuration ---
st.set_page_config(
    page_title="Container Loading Optimizer",
    page_icon="📦",
    layout="wide"
)


# --- App Title ---
st.title("📦 Container Loading Digital Twin")
st.caption("An interactive tool to find the optimal packing plan for your shipments.")


# --- Helper function to convert DF to CSV for download ---
@st.cache_data
def convert_df_to_csv(df: pd.DataFrame) -> bytes:
    return df.to_csv(index=False).encode('utf-8')


# --- Sidebar for Inputs ---
with st.sidebar:
    st.header("Configuration")

    # 1. Container Input
    st.subheader("1. Container Dimensions")
    # Standard 20ft container dimensions in cm
    container_length = st.number_input("Length (cm)", value=589.0, step=10.0)
    container_width = st.number_input("Width (cm)", value=235.0, step=10.0)
    container_height = st.number_input("Height (cm)", value=239.0, step=10.0)
    container_payload = st.number_input("Max Payload (kg)", value=25000.0, step=100.0)

    container_dims = {
        "length": container_length,
        "width": container_width,
        "height": container_height,
        "payload": container_payload
    }

    # 2. Product Input
    st.subheader("2. Product List")
    uploaded_file = st.file_uploader("Upload a CSV file with product data", type="csv")

    # 3. Solver Selection
    st.subheader("3. Optimization Algorithm")
    solver_option = st.selectbox(
        "Choose a packing algorithm",
        ("py3dbp (Recommended for stability)", "Greedy Heuristic (Fast but less optimal)")
    )

    run_button = st.button("Generate Loading Plan", type="primary")


# --- Main Content Area ---
if run_button:
    if uploaded_file is not None:
        try:
            # Read and process the uploaded product data
            products_df = pd.read_csv(uploaded_file)
            st.session_state.products_df = products_df

            # --- Run Solver ---
            with st.spinner("Optimizing container loading... This may take a moment."):
                if solver_option.startswith("py3dbp"):
                    placed_items, unplaced_items, utilization = solver.solve_with_py3dbp(container_dims, products_df)
                else:
                    placed_items, unplaced_items, utilization = solver.solve_with_greedy_heuristic(container_dims, products_df)

            st.session_state.placed_items = placed_items
            st.session_state.unplaced_items = unplaced_items
            st.session_state.utilization = utilization
            st.session_state.container_dims = container_dims

            st.success("Optimization Complete!")

        except Exception as e:
            st.error(f"An error occurred: {e}")
            st.error("Please ensure your CSV has columns: name, length, width, height, weight, quantity.")

    else:
        st.warning("Please upload a product CSV file to begin.")


# --- Display Results if they exist in session state ---
if 'placed_items' in st.session_state:

    # --- Key Metrics ---
    st.header("📊 Optimization Results")
    total_items = int(sum(st.session_state.products_df['quantity'])) if 'quantity' in st.session_state.products_df.columns else len(st.session_state.products_df)
    placed_count = len(st.session_state.placed_items)
    unplaced_count = len(st.session_state.unplaced_items)
    total_weight = sum(item['weight'] for item in st.session_state.placed_items)

    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Space Utilization", f"{st.session_state.utilization:.2f}%")
    col2.metric("Items Placed", f"{placed_count} / {total_items}")
    col3.metric("Total Weight", f"{total_weight:.2f} kg")
    col4.metric("Unplaced Items", f"{unplaced_count}")

    tab1, tab2, tab3 = st.tabs(["📦 3D Visualization", "📋 Loading Plan", "⚠️ Unplaced Items"])

    with tab1:
        # --- 3D Visualization ---
        st.subheader("3D Loading Visualization")
        if st.session_state.placed_items:
            fig = visualizer.draw_3d_plot(st.session_state.container_dims, st.session_state.placed_items)
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No items were placed. The 3D view is empty.")

    with tab2:
        # --- Loading Plan Table ---
        st.subheader("Step-by-Step Loading Sequence")
        if st.session_state.placed_items:
            # Reformat for readability
            loading_plan_data = []
            for i, item in enumerate(st.session_state.placed_items):
                pos = item['position']
                loading_plan_data.append({
                    "Step": i + 1,
                    "Product Name": item['name'],
                    "Position (X, Y, Z)": f"({pos[2]}, {pos[0]}, {pos[1]})",  # Map to Length, Width, Height
                    "Dimensions (L, W, H)": f"({item['depth']}, {item['width']}, {item['height']})",
                    "Weight (kg)": item['weight']
                })

            loading_plan_df = pd.DataFrame(loading_plan_data)
            st.dataframe(loading_plan_df, use_container_width=True)

            # --- Download Button ---
            csv = convert_df_to_csv(loading_plan_df)
            st.download_button(
                label="Download Loading Plan as CSV",
                data=csv,
                file_name='loading_plan.csv',
                mime='text/csv',
            )
        else:
            st.info("No loading plan generated as no items were placed.")

    with tab3:
        st.subheader("Items That Could Not Be Placed")
        if st.session_state.unplaced_items:
            unplaced_df = pd.DataFrame(st.session_state.unplaced_items)
            st.dataframe(unplaced_df, use_container_width=True)
        else:
            st.success("All items were successfully placed in the container!")

else:
    st.info("Upload a product list and click 'Generate Loading Plan' to see the results.")


