# Admin Product Management System

This system allows administrators to create products with Cloudinary-hosted images through a secure admin interface.

## Setup Instructions

### 1. Environment Variables

Create or update `.env.local` with your credentials:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password_here
```

**To get Cloudinary credentials:**
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

### 2. Install Dependencies

Dependencies are already installed. If needed, run:
```bash
npm install --legacy-peer-deps
```

### 3. Start Development Server

```bash
npm run dev
```

## Usage

### Adding Products

1. Navigate to `/admin/add-product`
2. Enter the admin password (set in `.env.local`)
3. Fill in the product form:
   - **Title**: Product name
   - **Description**: Detailed product description
   - **Rating**: 0-5 stars
   - **Sizes**: Add available sizes (e.g., S, M, L, XL)
   - **Colours**: Add available colors
   - **Images**: Upload multiple product images
4. Click "Create Product"
5. Images will be uploaded to Cloudinary
6. Product data will be saved to `/data/products.json`

### Viewing Products

- Visit `/shop` to see all products
- Products display with:
  - Primary image (hover to see count of additional images)
  - Rating stars
  - Title and description
  - Available sizes and colours

## API Endpoints

### Public Endpoints

#### GET /api/products
Get all products (no authentication required)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "prod_1234567890_abc123",
      "title": "Elegant Pink Dress",
      "description": "Beautiful dress for special occasions",
      "rating": 4.5,
      "sizes": ["S", "M", "L"],
      "colours": ["Pink", "Rose"],
      "images": [
        "https://res.cloudinary.com/.../image1.jpg",
        "https://res.cloudinary.com/.../image2.jpg"
      ],
      "createdAt": "2025-11-22T01:00:00.000Z",
      "updatedAt": "2025-11-22T01:00:00.000Z"
    }
  ]
}
```

### Admin Endpoints (Require Authentication)

#### POST /api/admin/products
Create a new product

**Headers:**
```
Authorization: Bearer <admin_password>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Elegant Pink Dress",
  "description": "Beautiful dress for special occasions",
  "rating": 4.5,
  "sizes": ["S", "M", "L"],
  "colours": ["Pink", "Rose"],
  "images": ["data:image/jpeg;base64,...", "data:image/jpeg;base64,..."]
}
```

**Response:**
```json
{
  "success": true,
  "data": { /* product object */ },
  "message": "Product created successfully"
}
```

#### GET /api/admin/products
Get all products (admin view)

**Headers:**
```
Authorization: Bearer <admin_password>
```

## File Structure

```
/app
  /admin
    /add-product
      page.tsx          # Admin product creation form
  /api
    /admin
      /products
        route.ts        # Admin product API (POST, GET)
    /products
      route.ts          # Public products API (GET)
  /shop
    page.tsx            # Shop page displaying products

/lib
  cloudinary.ts         # Cloudinary upload utilities
  products.ts           # Product data management

/types
  product.ts            # TypeScript type definitions

/data
  products.json         # Product data storage
```

## Security Notes

⚠️ **Important**: This implementation uses simple password-based authentication for demonstration purposes.

**For production, consider:**
- Implementing NextAuth.js or similar authentication
- Using JWT tokens for session management
- Adding role-based access control (RBAC)
- Implementing rate limiting
- Using a proper database instead of JSON files
- Adding CSRF protection
- Implementing secure password hashing

## Troubleshooting

### Images not uploading
- Check Cloudinary credentials in `.env.local`
- Ensure images are under 10MB
- Check browser console for errors

### Products not saving
- Ensure `/data` directory has write permissions
- Check server logs for errors

### Authentication failing
- Verify `ADMIN_PASSWORD` is set in `.env.local`
- Restart the development server after changing environment variables

## Migration to Database

To migrate from JSON to a database:

1. Choose a database (MongoDB, PostgreSQL, etc.)
2. Update `/lib/products.ts` to use database queries
3. Keep the same function signatures for compatibility
4. Update API routes if needed for async database operations
