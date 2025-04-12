# Next.js E-Commerce Website

A modern, full-featured e-commerce platform built with Next.js and Supabase, designed to provide a seamless shopping experience for customers and a powerful management interface for administrators.

![E-Commerce Platform](https://example.com/screenshot.png) <!-- Replace with actual screenshot -->

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse products with filtering and search capabilities
- **Shopping Cart**: Add products to cart, update quantities, and remove items
- **User Authentication**: Create accounts, login, and manage profiles
- **Order Processing**: Complete checkout process with payment integration
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Direct Image Upload**: Upload product images directly to Supabase storage
- **Inventory Management**: Track product stock levels
- **Order Management**: View and process customer orders
- **User Management**: Manage customer accounts and admin access

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Tailwind CSS, DaisyUI for components
- **State Management**: Zustand for client-side state
- **Database & Authentication**: Supabase (PostgreSQL + Authentication)
- **Image Storage**: Supabase Storage
- **Payment Processing**: Flutterwave integration
- **Email**: Nodemailer for transactional emails
- **Icons**: Heroicons and React Icons

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Supabase account

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce_website.git
   cd ecommerce_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
   FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
   EMAIL_SERVER=your_smtp_server
   EMAIL_FROM=your_email_address
   EMAIL_PASSWORD=your_email_password
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Set up the following tables:
     - `products`: For storing product information
     - `users`: For user accounts
     - `orders`: For tracking customer orders
   - Create a storage bucket named `product-images` with appropriate RLS policies
   
   Follow the detailed instructions in `/docs/supabase-storage-setup.md`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── app/                  # Next.js App Router structure
│   ├── admin/            # Admin interface pages
│   ├── api/              # API routes for server operations
│   ├── cart/             # Shopping cart page
│   ├── checkout/         # Checkout flow
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility libraries and API interfaces
│   │   ├── api.ts        # API client functions
│   │   ├── supabase.ts   # Supabase client and operations
│   ├── products/         # Product listing and detail pages
│   ├── types/            # TypeScript type definitions
├── docs/                 # Documentation
├── public/               # Static assets
├── scripts/              # Utility scripts
```

## 🔐 Authentication System

The application uses a role-based authentication system:

- **User Roles**: Regular users and administrators
- **Authentication Flow**: Email/password login with NextAuth.js
- **Protected Routes**: Admin-only areas with role verification
- **Security**: Server-side validation and protected API routes

## 🖼️ Image Upload System

Product images can be uploaded directly to Supabase Storage:

- **Storage Bucket**: Dedicated `product-images` bucket
- **Security**: Row Level Security (RLS) policies:
  - Public read access for all users
  - Write access limited to authenticated admin users
- **UI Component**: Drag-and-drop interface for image uploads

## 💳 Payment Processing

Integrated with Flutterwave for secure payment processing:

- **Payment Methods**: Credit/debit cards, bank transfers
- **Verification**: Server-side verification of transactions
- **Security**: No sensitive payment data stored in the application

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow component-based architecture
- Document functions with JSDoc comments
- Use semantic naming conventions

### State Management
- Server state: Managed via API calls to Supabase
- Client state: Managed with Zustand for UI state

### Testing
- Run tests with `npm test`
- Follow TDD practices for new features

## 🚀 Deployment

This application can be deployed to Vercel, Netlify, or any platform supporting Next.js applications.

1. Configure environment variables on your hosting platform
2. Connect your repository
3. Deploy the application

## 📄 License

[MIT](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js and Supabase
