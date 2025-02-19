# 🌟 Tech Scene API

This project provides APIs to retrieve and analyze participants' data in the tech industry. It uses the Hono framework for building the API and Jest for testing.

## 📋 Table of Contents

- [🌟 Tech Scene API](#-tech-scene-api)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Getting Started](#-getting-started)
    - [🔧 Prerequisites](#-prerequisites)
    - [📦 Installation](#-installation)
    - [🖥️ Running the Server](#️-running-the-server)
    - [🧪 Running Tests](#-running-tests)
    - [☁️ Deployment](#️-deployment)
  - [📚 API Documentation](#-api-documentation)
    - [👥 Participants Endpoint](#-participants-endpoint)
    - [📊 Stats Endpoint](#-stats-endpoint)
  - [🗂️ Project Structure](#️-project-structure)
  - [🤝 Contributing](#-contributing)
  - [📜 License](#-license)

## 🚀 Getting Started

### 🔧 Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Cloudflare Wrangler

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tech-scene-api.git
   cd tech-scene-api
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### 🖥️ Running the Server

1. Start the development server with Wrangler:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. The server should now be running at `http://localhost:8787`.

### 🧪 Running Tests

To run the test suite:

```bash
npm test
# or
yarn test
```

### ☁️ Deployment

Deploy the application using Wrangler:

```bash
npm run deploy
# or
yarn deploy
```

## 📚 API Documentation

### 👥 Participants Endpoint

- **Endpoint:** `/participants`
- **Method:** `GET`
- **Query Parameters:**
  - `title` (string): Job title
  - `level` (string): Job level
  - `gender` (string): Gender
  - `cs_degree` (string): CS Degree (yes/no)
  - `business_market` (string): Business market (global/regional/local)
  - `business_size` (string): Business size (large/medium/small)
  - `business_focus` (string): Business focus (product/software_house)
  - `business_line` (string): Business line (b2b/b2c/both)
  - `yoe_from_included` (number): Years of experience from
  - `yoe_to_excluded` (number): Years of experience to
  - `programming_language` (string): Programming language
  - `include_relocated` (string): Include relocated (true/false)
  - `include_remote_abroad` (string): Include remote abroad (true/false)

- **Example Request:**
  ```bash
  curl "http://localhost:8787/participants?title=backend&level=senior"
  ```

- **Example Response:**
  ```json
  [
    {
      "title": "Backend Engineer",
      "level": "Senior",
      "gender": "Male",
      "degree": "Yes",
      "businessMarket": "Global",
      "businessSize": "Large",
      "businessFocus": "Product-based company",
      "businessLine": "B2B",
      "yearsOfExperience": 5,
      "programmingLanguagues": "Python, Java, etc.",
      "workSetting": "Office",
      "isEgp": true,
      "netCompensation": 120000,
      "location": "Cairo"
    }
  ]
  ```

### 📊 Stats Endpoint

- **Endpoint:** `/stats`
- **Method:** `GET`
- **Query Parameters:**
  - Similar to the Participants endpoint
  - `title` (string)
  - `level` (string)
  - `gender` (string)
  - `cs_degree` (string)
  - `business_market` (string)
  - `business_size` (string)
  - `business_focus` (string)
  - `business_line` (string)
  - `yoe_from_included` (number)
  - `yoe_to_excluded` (number)
  - `programming_language` (string)
  - `include_relocated` (string)
  - `include_remote_abroad` (string)

- **Example Request:**
  ```bash
  curl "http://localhost:8787/stats?title=backend&level=senior"
  ```

- **Example Response:**
  ```json
  {
    "stats": {
      "totalCount": 150,
      "median": 75000,
      "p20Compensation": 50000,
      "p75Compensation": 90000,
      "p90Compensation": 120000
    },
    "buckets": [
      { "bucket": "0-3K", "count": 10 },
      { "bucket": "3-6K", "count": 20 },
      // more buckets...
    ]
  }
  ```

## 🗂️ Project Structure

```
project-root/
├── src/
│   ├── routes/
│   │   ├── participants.ts
│   │   ├── stats.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── queryHelpers.ts
│   │   └── maps.ts
│   ├── config/
│   │   └── swaggerSpec.ts
│   ├── types/
│   │   └── bindings.ts
│   ├── app.ts
│   └── index.ts
├── tests/
│   ├── utils/
│   │   └── queryHelpers.test.ts
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides a comprehensive guide for setting up, running, and testing the project, as well as detailed API documentation and project structure information.\
this is me