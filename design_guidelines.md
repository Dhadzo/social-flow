# Social Media Posting Tool Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern productivity tools like Notion, Linear, and social platforms like Twitter/Instagram for their clean interfaces and intuitive workflows.

## Core Design Principles
- **Efficiency First**: Streamlined workflows for quick post creation and scheduling
- **Visual Hierarchy**: Clear distinction between primary actions and secondary information
- **Platform Recognition**: Consistent use of platform brand colors and icons

## Color Palette

### Dark Mode (Primary)
- **Background**: 15 8% 8% (deep charcoal)
- **Surface**: 15 6% 12% (elevated surfaces)
- **Primary**: 221 83% 53% (vibrant blue for CTAs)
- **Text Primary**: 0 0% 98% (near white)
- **Text Secondary**: 0 0% 70% (muted gray)
- **Success**: 142 76% 36% (post success states)
- **Warning**: 38 92% 50% (scheduled posts)
- **Error**: 0 84% 60% (failed posts)

### Light Mode (Secondary)
- **Background**: 0 0% 100% (pure white)
- **Surface**: 220 14% 96% (light gray surfaces)
- **Primary**: 221 83% 53% (same vibrant blue)
- **Text Primary**: 222 84% 5% (near black)
- **Text Secondary**: 215 14% 34% (dark gray)

## Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern sans-serif
- **Headings**: Font weights 600-700, sizes from text-lg to text-3xl
- **Body Text**: Font weight 400, text-sm to text-base
- **UI Labels**: Font weight 500, text-xs to text-sm

## Layout System
**Tailwind Spacing Units**: Consistent use of 2, 4, 8, 16, 24 units
- **Micro spacing**: p-2, m-2 (8px) for tight elements
- **Standard spacing**: p-4, m-4 (16px) for general layouts
- **Section spacing**: p-8, m-8 (32px) for major separations
- **Page margins**: p-16, p-24 for generous whitespace

## Component Library

### Navigation
- **Sidebar**: Fixed left navigation with platform icons and main sections
- **Breadcrumbs**: Secondary navigation showing current location
- **Tab Navigation**: For switching between post types or time periods

### Forms & Inputs
- **Text Areas**: Rounded corners (rounded-lg), subtle borders with focus states
- **File Upload**: Drag-and-drop zones with dotted borders and upload icons
- **Date/Time Pickers**: Clean calendar interfaces with time selection
- **Platform Checkboxes**: Custom checkboxes with platform brand colors when selected

### Data Display
- **Post Cards**: Elevated surfaces (shadow-sm) with platform indicators
- **Status Badges**: Color-coded pills for post status (scheduled/posted/failed)
- **Account Cards**: Connected platform accounts with connection status
- **History Table**: Clean rows with hover states and sortable columns

### Interactive Elements
- **Primary Buttons**: Solid blue background, white text, rounded-lg
- **Secondary Buttons**: Outline style with hover fill transitions
- **Icon Buttons**: Subtle hover states, appropriate sizing for context
- **Toggle Switches**: For account connections and settings

### Overlays
- **Modal Dialogs**: Centered, blurred backdrop, slide-in animations
- **Toast Notifications**: Top-right positioned, auto-dismiss, status colors
- **Dropdown Menus**: Clean shadows, proper spacing, keyboard navigation

## Images
No large hero images needed. Focus on:
- **Platform Icons**: High-quality SVG icons for Twitter, Facebook, LinkedIn, Instagram, TikTok
- **User Avatars**: Circular profile images with fallback initials
- **Media Previews**: Thumbnail previews of uploaded images/videos in post composer
- **Empty States**: Simple illustrations for empty post history or disconnected accounts

## Responsive Behavior
- **Desktop**: Full sidebar navigation, multi-column layouts where appropriate
- **Tablet**: Collapsible sidebar, adjusted spacing
- **Mobile**: Bottom tab navigation, stacked layouts, full-width forms

## Animation Guidelines
- **Minimal and Purposeful**: Subtle hover states, smooth transitions (200-300ms)
- **Loading States**: Skeleton loaders for post lists and account data
- **Success Feedback**: Brief scale animations for successful actions
- **No Distracting Effects**: Focus on functionality over flashy animations