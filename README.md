# VartalapAI Projects

This repository contains a collection of three distinct applications, each designed to solve a specific business problem using modern technologies.

## Table of Contents

1.  [Data Quality Analyzer and Cleaner](#data-quality-analyzer-and-cleaner)
2.  [VartalapAI Digital Twin](#vartalapai-digital-twin)
3.  [Vartalap Sahayata](#vartalap-sahayata)

---

## 1. Data Quality Analyzer and Cleaner

A comprehensive, client-side data analysis platform for survey data. It offers advanced statistical estimation, AI-powered data exploration, schema mapping, weighting, validation, and professional reporting capabilities.

### Features

-   **Multi-Format Data Upload**: Supports CSV, XLSX, and XLS formats with a drag-and-drop interface.
-   **Advanced Data Profiling**: Includes column profiling, missing value analysis, duplicate detection, and outlier detection.
-   **Intelligent Data Cleaning**: Provides tools for missing value imputation, duplicate removal, outlier treatment, and text standardization.
-   **Schema Mapping**: Visual interface for mapping data columns to a schema, with intelligent suggestions.
-   **Survey Weighting**: Supports design weights, post-stratification, and raking.
-   **AI-Powered Data Exploration**: Natural language queries for dataset analysis using the Perplexity Sonar API.
-   **Comprehensive Reporting**: Generates quality dashboards, before/after comparisons, and detailed logs.

### How to Run

1.  **Navigate to the project directory:**
    ```bash
    cd Data-Quality-Analyzer-And-Cleaner-main
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a `.env` file in the project root.
    -   Add your Perplexity API key:
        ```
        VITE_PPLX_API_KEY=your_api_key_here
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.


---

## 2. VartalapAI Digital Twin

A Streamlit-based application that optimizes container loading for shipments. It uses packing algorithms to find the most efficient way to pack products into a container.

### Features

-   **Interactive Interface**: Built with Streamlit for easy user interaction.
-   **Customizable Container Dimensions**: Users can define the length, width, height, and payload of the container.
-   **Product List Upload**: Supports uploading a CSV file with product data (name, dimensions, weight, quantity).
-   **Multiple Solver Options**: Choose between `py3dbp` for stability or a greedy heuristic for speed.
-   **3D Visualization**: Provides a 3D plot of the packed container.
-   **Loading Plan Generation**: Creates a step-by-step loading sequence.

### How to Run

1.  **Navigate to the project directory:**
    ```bash
    cd VartalapAI-Digital-Twin-main
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    *(Note: A `requirements.txt` file may need to be created based on the imports in `app.py`)*

3.  **Run the application:**
    ```bash
    streamlit run app.py
    ```
    The application will open in your web browser.

---

## 3. Vartalap Sahayata

A business intelligence dashboard built with React and TypeScript. It provides tools for managing sales, inventory, customers, and finances, with advanced analytics and forecasting capabilities.

### Features

-   **Bill and Statement Generation**: Create and manage customer bills and statements.
-   **Product and Inventory Management**: Track product master data and inventory levels.
-   **Expense Tracking**: Monitor and categorize business expenses.
-   **Customer Profitability Analysis**: Analyze customer behavior and profitability.
-   **Sales Forecasting**: Predict future sales trends.
-   **Advanced Analytics**: A comprehensive dashboard for business overview and deep dives.

### How to Run

1.  **Navigate to the project directory:**
    ```bash
    cd vartalap-sahayata-main
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.