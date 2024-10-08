# Webpack Loaders Configuration

This module exports a function `buildLoaders` that generates an array of Webpack loaders based on the provided `BuildOptions`. These loaders are responsible for processing various file types and integrating them into the build process, ensuring that different assets and code formats are correctly handled.

## Function: `buildLoaders`

### Parameters

- **`options: BuildOptions`**: An object containing configuration options, including a flag for development mode (`isDev`).

### Returns

- **`webpack.RuleSetRule[]`**: An array of Webpack loader rules configured according to the input options.

### Loaders

- **`svgLoader`**:
    - **Purpose**: Handles SVG files by using `@svgr/webpack` to convert SVGs into React components.
    - **Configuration**:
        - **`test`**: Matches files with the `.svg` extension.
        - **`use`**: Utilizes `@svgr/webpack` with options to:
            - Treat SVGs as icons.
            - Apply `svgoConfig` for optimizing SVGs, including converting colors to the current color.

- **`codeBabelLoader`**:
    - **Purpose**: Transpiles JavaScript files using Babel, excluding TypeScript JSX files.
    - **Configuration**: Generated by the `buildBabelLoader` function with `isTsx` set to `false`.

- **`tsxCodeBabelLoader`**:
    - **Purpose**: Transpiles TypeScript JSX files using Babel.
    - **Configuration**: Generated by the `buildBabelLoader` function with `isTsx` set to `true`.

- **`cssLoader`**:
    - **Purpose**: Processes CSS files, with different settings for development mode (`isDev`).
    - **Configuration**: Generated by the `buildCssLoader` function, which adjusts based on whether the build is in development or production mode.

- **`fileLoader`**:
    - **Purpose**: Handles static asset files such as images and fonts.
    - **Configuration**:
        - **`test`**: Matches files with extensions `.png`, `.jpeg`, `.jpg`, `.gif`, `.woff2`, and `.woff`.
        - **`use`**: Utilizes `file-loader` to manage these assets.

### Optional Loaders (Commented Out)

- **`typescriptLoader`**:
    - **Purpose**: Processes TypeScript files using `ts-loader`.
    - **Configuration**:
        - **`test`**: Matches files with `.tsx?` extensions.
        - **`use`**: Uses `ts-loader` to handle TypeScript files.
        - **`exclude`**: Excludes the `node_modules` directory.

## Usage

The `buildLoaders` function provides a modular approach to defining Webpack loaders, accommodating various file types and development needs. By using separate loader configurations, it simplifies the integration of assets and code transformations into the build process.

This setup allows for flexible handling of SVGs, JavaScript, TypeScript, CSS, and static assets, with specific configurations for development and production environments.

