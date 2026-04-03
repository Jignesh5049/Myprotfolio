import f1 from "../assets/f1.png";
import f2 from "../assets/f2.png";
import f3 from "../assets/f3.png";
import f4 from "../assets/f4.png";
import fa1 from "../assets/fa1.png";
import fa2 from "../assets/fa2.png";
import fa3 from "../assets/fa3.png";
import fe1 from "../assets/fe-1.png";
import fe2 from "../assets/fe-2.png";
import fe3 from "../assets/fe-3.png";
import fe4 from "../assets/fe-4.png";
import hcPic1 from "../assets/hc-pic1.PNG";
import hcPic2 from "../assets/hc-pic2.PNG";
import hcPic3 from "../assets/hc-pic3.PNG";
import km1 from "../assets/km1.png";
import km2 from "../assets/km2.png";
import km3 from "../assets/km3.png";
import km4 from "../assets/km4.png";
import sm1 from "../assets/sm1.png";
import sm2 from "../assets/sm2.png";
import sm3 from "../assets/sm3.png";
import vrh1 from "../assets/vrh-1.png";
import vrh2 from "../assets/vrh-2.png";
import vrh3 from "../assets/vrh-3.png";
import vrh4 from "../assets/vrh-4.png";
import vrh5 from "../assets/vrh-5.png";
import et1 from "../assets/ET-1.jpeg";
import et2 from "../assets/ET-2.jpeg";
import qu1 from "../assets/Qu-1.jpeg";
import qu2 from "../assets/Qu-2.jpeg";
import qu3 from "../assets/Qu-3.jpeg";
import biznest1 from "../../docs/assets/b.png";
import biznest2 from "../../docs/assets/b1.png";
import biznest3 from "../../docs/assets/b2.png";
import bn from "../../docs/assets/bn.jpeg";
import bn1 from "../../docs/assets/bn1.jpeg";
import bn2 from "../../docs/assets/bn2.jpeg";
import bn3 from "../../docs/assets/bn3.jpeg";
import bn4 from "../../docs/assets/bn4.jpeg";
import bns from "../../docs/assets/bns.jpeg";
import bns1 from "../../docs/assets/bns1.jpeg";
import bns2 from "../../docs/assets/bns2.jpeg";
import bns3 from "../../docs/assets/bns3.jpeg";
import bns4 from "../../docs/assets/bns4.jpeg";

export const PROJECT_IMAGES = {
    fa: [fa1, fa2, fa3],
    f: [f1, f2, f3, f4],
    fe: [fe1, fe2, fe3, fe4],
    hc: [hcPic1, hcPic2, hcPic3],
    km: [km1, km2, km3, km4],
    sm: [sm1, sm2, sm3],
    vrh: [vrh1, vrh2, vrh3, vrh4, vrh5],
    et: [et1, et2],
    qu: [qu1, qu2, qu3],
    biznest: [biznest1, biznest2, biznest3],
    bn: [bn, bn1, bn2, bn3, bn4],
    bns: [bns, bns1, bns2, bns3, bns4],
};

export const PROJECT_CATEGORIES = [
    "All",
    "Web Development",
    "UI/UX",
    "Mobile Apps",
    "Data & Analytics",
];

export const PROJECTS = [
    {
        id: 1,
        slug: "flipkart-mobile-sales-analytics",
        title: "Flipkart Mobile Sales Data Visualization & Price Prediction",
        category: "Data & Analytics",
        shortDesc:
            "Comprehensive data analysis and predictive modeling on mobile phone sales data with interactive visualizations.",
        tech: ["Python", "Pandas", "Matplotlib", "Scikit-learn", "Jupyter"],
        timeline: "2025",
        role: "Data Analyst & ML Engineer",
        highlights: [
            "Analyzed Flipkart mobile sales dataset to uncover pricing trends, brand performance, and market insights.",
            "Created interactive visualizations for price distribution, specifications correlation, and sales patterns.",
            "Developed predictive models using machine learning algorithms to forecast mobile phone prices.",
            "Generated actionable insights on feature importance and market segmentation for pricing strategies.",
        ],
    },
    {
        id: 2,
        slug: "flightaware-travel-booking",
        title: "FlightAware - Travel Booking Web Platform",
        category: "UI/UX",
        shortDesc:
            "End-to-end travel-booking website concept with hero search, service clusters, and rich destination stories.",
        tech: ["Figma", "UI Design", "Web"],
        timeline: "2025",
        role: "Product Designer",
        imagesKey: "fa",
        highlights: [
            "Structured navigation with hero search, destination filters, and newsletter capture.",
            "Crafted gradient hero, icon-driven services, and card-based travel packages for clarity.",
            "Prioritized a seamless booking flow using large imagery and grouped travel services.",
        ],
    },
    {
        id: 3,
        slug: "foodieexpress-food-delivery",
        title: "foodieExpress - Food Delivery Mobile App",
        category: "Mobile Apps",
        shortDesc:
            "Modern food delivery platform UI with restaurant discovery, menu browsing, cart management, and real-time order tracking.",
        tech: ["Figma", "Mobile UI", "Prototyping"],
        timeline: "2025",
        role: "UI/UX Designer",
        imagesKey: "fe",
        hasMobileScreenshots: true,
        highlights: [
            "Designed intuitive restaurant discovery with search, filters, ratings, and quick restaurant cards.",
            "Created seamless menu browsing experience with food categorization, descriptions, prices, and food images.",
            "Built smooth cart and checkout flow with item customization, quantity selection, and secure payment options.",
            "Implemented real-time order tracking screen with delivery progress, estimated arrival, and live location updates.",
        ],
    },
    {
        id: 4,
        slug: "frutify-fresh-fruits",
        title: "Frutify - Fresh Fruits & Juice Ordering App",
        category: "Mobile Apps",
        shortDesc:
            "Mobile commerce UI with splash, auth flow, category browsing, product cards, and cart experience.",
        tech: ["Figma", "Mobile UI", "Proto"],
        timeline: "2025",
        role: "UI/UX Designer",
        imagesKey: "f",
        hasMobileScreenshots: true,
        highlights: [
            "Applied bold fruit palette, rounded cards, and pricing tags that feel instantly shoppable.",
            "Designed rating icons, filters, add-to-cart buttons, and a sticky bottom navigation.",
            "Mapped full journey from splash and login to cart review for a cohesive app-like feel.",
        ],
    },
    {
        id: 5,
        slug: "hobbyclass-learning",
        title: "HobbyClass - Online Hobby Learning Website",
        category: "UI/UX",
        shortDesc:
            "Exploration platform for art, dance, music, and tech classes with tutor discovery and quick signup.",
        tech: ["Figma", "Component Library", "Web"],
        timeline: "2024",
        role: "Product Designer",
        imagesKey: "hc",
        highlights: [
            "Laid out hero signup form, category tabs, and carousel tutor highlights for effortless scanning.",
            "Created mentor cards with hover states plus top tutor rail for credibility.",
            "Used a calm blue palette, airy spacing, and scroll-friendly sections to keep focus on content.",
        ],
    },
    {
        id: 6,
        slug: "krishimitra-farm-marketplace",
        title: "KrishiMitra - Farmer-to-Consumer Ecommerce App",
        category: "Mobile Apps",
        shortDesc:
            "Farm marketplace app connecting rural producers to cities with transparent listings and orders.",
        tech: ["Figma", "Design Systems", "Mobile"],
        timeline: "2024",
        role: "Product Designer",
        imagesKey: "km",
        hasMobileScreenshots: true,
        highlights: [
            "Built flows for category browsing, product detail, farmer profiles, cart, and summary screens.",
            "Used clean white/green palette, dropdown navigation, and readable typography for trust.",
            "Highlighted farmer info and simple menu system tailored for rural-to-urban commerce.",
        ],
    },
    {
        id: 7,
        slug: "staymajestic-hotel-booking",
        title: "StayMajestic - Hotel Booking Website",
        category: "Web Development",
        shortDesc:
            "Premium hotel booking UI with night-themed hero, location search, loyalty CTA, and FAQ accordions.",
        tech: ["Figma", "UI Design", "Web"],
        timeline: "2025",
        role: "Product Designer",
        imagesKey: "sm",
        highlights: [
            "Composed dark hero banner, membership CTA, and destination cards to feel luxurious.",
            "Blended location-based search, modern layouts, and smooth spacing for clarity.",
            "Added FAQ accordion and curated content blocks to keep the experience concise yet rich.",
        ],
    },
    {
        id: 8,
        slug: "vintage-rides-hub",
        title: "Vintage Rides Hub - Car Rental & Sales Platform",
        category: "Web Development",
        shortDesc:
            "Full-stack car marketplace with rental, buying, selling, and price prediction features powered by machine learning.",
        tech: ["React", "Python", "Flask", "ML", "Data Analytics"],
        timeline: "2025",
        role: "Full Stack Developer",
        imagesKey: "vrh",
        highlights: [
            "Developed integrated platform for car rentals, purchases, and sales with seamless user workflows.",
            "Built ML-powered price prediction model for accurate vehicle valuations using historical data.",
            "Implemented search, filtering, and booking modals with real-time inventory management.",
            "Created responsive React UI with context API for state management and dynamic car listings.",
        ],
    },
    {
        id: 9,
        slug: "expense-tracker-flutter",
        title: "Expense Tracker - Personal Finance Management App",
        category: "Mobile Apps",
        shortDesc:
            "A Flutter-based expense tracking application with intuitive swipe-to-delete functionality and visual expense analytics through interactive charts.",
        tech: ["Flutter", "Dart", "Charts", "State Management"],
        timeline: "2025",
        role: "Flutter Developer",
        imagesKey: "et",
        hasMobileScreenshots: true,
        highlights: [
            "Built a clean and intuitive mobile app for tracking daily expenses with category-based organization.",
            "Implemented swipe-to-delete gesture for seamless expense removal with undo functionality.",
            "Integrated dynamic chart visualization to display spending patterns and expense distribution.",
            "Developed persistent local storage for expense data with date-wise filtering and sorting capabilities.",
        ],
    },
    {
        id: 10,
        slug: "flutter-quiz-master",
        title: "Flutter Quiz Master - Interactive Learning App",
        category: "Mobile Apps",
        shortDesc:
            "An engaging quiz application built with Flutter that tests users on Flutter framework knowledge and displays comprehensive results with correct answers.",
        tech: ["Flutter", "Dart", "Quiz Logic", "UI Animation"],
        timeline: "2025",
        role: "Flutter Developer",
        imagesKey: "qu",
        hasMobileScreenshots: true,
        highlights: [
            "Designed an engaging quiz interface with multiple-choice questions focused on Flutter framework concepts.",
            "Implemented comprehensive result screen showing score, percentage, and detailed answer review.",
            "Added visual feedback for correct and incorrect answers to enhance the learning experience.",
            "Built smooth navigation transitions and animated UI elements for an interactive user experience.",
        ],
    },
    {
        id: 11,
        slug: "biznest-business-enablement-platform",
        title: "BizNest - Business Enablement Platform",
        category: "Web Development",
        shortDesc:
            "A full-stack business enablement platform for small and home-based businesses with dashboards, inventory control, customer management, storefront features, and support tools.",
        tech: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
        timeline: "2026",
        role: "Full Stack Project",
        liveUrl: "https://bizenst.vercel.app/",
        imagesKey: "biznest",
        highlights: [
            "Built a dual-role platform for business owners and customers with a clear separation between management and storefront workflows.",
            "Included real-time business dashboards, analytics, inventory management, order tracking, and expense monitoring for day-to-day operations.",
            "Added customer-facing shopping, ratings and reviews, wishlist, delivery addresses, and support ticket flows.",
            "Supported secure authentication, role-based access, and MongoDB persistence across web and mobile experiences.",
        ],
    },
    {
        id: 12,
        slug: "biznest-mobile-business-app",
        title: "BizNest - Mobile Business App",
        category: "Mobile Apps",
        shortDesc:
            "Business-owner focused mobile app for managing operations with dashboard analytics, products, inventory, orders, customers, expenses, and support.",
        tech: ["React Native", "Node.js", "MongoDB", "JWT", "Supabase"],
        timeline: "2026",
        role: "Business Owner App",
        imagesKey: "bn",
        hasMobileScreenshots: true,
        highlights: [
            "Built a dedicated business-owner flow with real-time dashboard metrics for revenue, orders, profit, and overall business health.",
            "Implemented product and inventory management with add/update flows, pricing controls, and stock visibility.",
            "Added customer and order management tools to track purchase history, payment status, fulfillment progress, and customer value.",
            "Integrated expense tracking, analytics, support ticket handling, and role-based secure authentication for business operations.",
        ],
    },
    {
        id: 13,
        slug: "biznest-shop-mobile-customer-app",
        title: "BizNest Shop - Mobile Customer App",
        category: "Mobile Apps",
        shortDesc:
            "Customer-side mobile shopping experience with store discovery, cart and checkout, ratings and reviews, order tracking, wishlist, and support.",
        tech: ["React Native", "Node.js", "MongoDB", "JWT", "Supabase"],
        timeline: "2026",
        role: "Customer App",
        imagesKey: "bns",
        hasMobileScreenshots: true,
        highlights: [
            "Created customer storefront browsing with search and filtering to help users discover products quickly.",
            "Implemented ratings and reviews, favorites/wishlist, and cart-to-checkout flows for a complete shopping journey.",
            "Added order tracking with status updates, order history, and delivery address management.",
            "Included customer support ticket creation and tracking with secure login and persistent cross-platform data.",
        ],
    },
];

export const getProjectBySlug = (slug) =>
    PROJECTS.find((project) => project.slug === slug);
