# EstatePulse Live 🏡

**EstatePulse Live** is a next-generation real estate market analysis tool designed to bridge the gap between static property listings and real-time market intelligence. Built with **React 19**, **TypeScript**, and **Google Gemini AI**, it provides investors and homebuyers with instant, grounded insights into any US housing market.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-%5E19.0.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.7.0-3178c6.svg)
![Vite](https://img.shields.io/badge/vite-%5E6.0.0-646cff.svg)

---

## 🚀 Features

- **📍 Interactive Geospatial Mapping**  
  Visualize property distributions across any US city with color-coded price points and dynamic clustering using **Leaflet**.

- **🤖 AI-Powered Market Grounding**  
  Leverages **Google Gemini 2.0 Flash** to perform live searches on Google Maps and Google Search, retrieving real-time active listings that may not yet be on major aggregators.

- **📊 Instant Statistical Analysis**  
  Automatically calculates key market indicators including:
  - Median & Average Prices
  - Price per Square Foot
  - Inventory Volume
  - Construction Era Profiles (Year Built distributions)

- **⚡ Modern, Responsive UI**  
  A sleek, glassmorphic interface built with **TailwindCSS** that provides a premium user experience across desktop and tablet devices.

- **🔍 Advanced Filtering**  
  Deep dive into specific neighborhoods, price ranges, square footage, and property types (Single Family, Condo, Multi-Family).

## 🛠️ Technology Stack

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, Vanilla CSS (Custom Glassmorphism)
- **Maps & Viz**: React Leaflet, Recharts
- **AI Integration**: Google GenAI SDK (Gemini 2.0 Flash)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/divijagv/RealEstate_Pulse.git
    cd RealEstate_Pulse
    ```

2.  **Install Dependencies**
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_KEY=your_gemini_api_key_here
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the app.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
