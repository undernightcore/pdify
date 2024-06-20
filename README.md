# Pdify

Pdify is a Node.js application that allows you to generate PDFs from URLs. It uses Puppeteer for headless browser automation and Zod for schema validation.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Building the Project with Docker

1. Clone the repository:

    ```bash
    git clone https://github.com/undernightcore/pdify.git
    cd pdify
    ```

2. Build the Docker image:

    ```bash
    docker build -t pdify .
    ```

3. Run the Docker container:

    ```bash
    docker run -p 8080:8080 pdify
    ```

   The application will be available at `http://localhost:8080`.

## Running the Project with Docker Compose

1. Clone the repository (if not already done):

    ```bash
    git clone https://github.com/undernightcore/pdify.git
    cd pdify
    ```

2. Create a `docker-compose.yml` file in the root of the repository with the following content:

    ```yaml
    version: '3'
    services:
      pdify:
        build: .
        ports:
          - "8080:8080"
    ```

3. Run Docker Compose:

    ```bash
    docker-compose up
    ```

   The application will be available at `http://localhost:8080`.

## API Endpoints

### `POST /print`

Generate a PDF from a URL.

#### Request Body

```json
{
  "url": "https://example.com",
  "options": {
    "expandScrolls": false,
    "customCss": "body { font-size: 14px; }",
    "height": 1190,
    "width": 1684,
    "waitForSelectors": ["#content"]
  }
}
```

#### Options Explained

- `url` (string): **Required**. The URL of the website to generate the PDF from. Must be a valid HTTP or HTTPS URL.
- `expandScrolls` (boolean): If `true`, it will override the CSS to remove scroll restrictions, allowing all content to be captured in the PDF. Default is `false`.
- `customCss` (string): Optional. Custom CSS to be applied to the page before generating the PDF. Useful for styling adjustments.
- `height` (number): The height of the PDF in pixels. Default is `1190`.
- `width` (number): The width of the PDF in pixels. Default is `1684`.
- `waitForSelectors` (array of strings): Optional. An array of CSS selectors that the page should wait for before generating the PDF. This ensures that the specified elements are loaded. (If not provided it will wait for all network requests to finish before printing)

### `GET /`

Health check endpoint.

#### Responses

- `200 OK`: Returns a JSON message indicating that the service is running.
