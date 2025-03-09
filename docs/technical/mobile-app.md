# Dokkerr Mobile App

## Overview
The Dokkerr mobile app is built using React Native and Expo, providing a native-like experience for both iOS and Android users. The app offers a seamless interface for boaters to find, book, and manage dock rentals, while also enabling dock owners to list and manage their properties.

## Tech Stack
- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Components**: React Native Paper
- **Maps**: React Native Maps
- **Authentication**: JWT with secure storage
- **API Client**: Axios with interceptors
- **Image Handling**: React Native Image Picker
- **Push Notifications**: Expo Notifications

## Key Features

### For Boaters
- Browse available docks with advanced filtering
- View detailed dock listings with photos and amenities
- Real-time availability calendar
- Secure booking process with Stripe integration
- In-app messaging with dock owners
- Push notifications for booking updates
- Offline access to saved listings
- Boat profile management

### For Dock Owners
- Easy dock listing creation and management
- Photo upload and management
- Availability calendar management
- Booking request handling
- Revenue tracking and analytics
- Customer communication
- Push notifications for new bookings

## Architecture

### Project Structure
```
dokkerr-mobile/
├── src/
│   ├── api/           # API client and endpoints
│   ├── components/    # Reusable UI components
│   ├── screens/       # Screen components
│   ├── navigation/    # Navigation configuration
│   ├── store/         # Redux store and slices
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── constants/     # App constants
│   └── types/         # TypeScript types
├── assets/            # Static assets
└── config/           # Configuration files
```

### State Management
The app uses Redux Toolkit for state management with the following main slices:
- Authentication
- Dock Listings
- Bookings
- Messages
- User Profile

### Navigation
The app implements a tab-based navigation with the following main sections:
- Home (Dock Listings)
- Search
- Bookings
- Messages
- Profile

## Security

### Authentication
- JWT tokens stored securely using Expo SecureStore
- Biometric authentication option
- Auto-refresh tokens
- Secure API communication

### Data Protection
- End-to-end encryption for messages
- Secure storage for sensitive data
- Certificate pinning
- Regular security audits

## Performance Optimization

### Image Optimization
- Lazy loading of images
- Image caching
- Progressive loading
- Compression before upload

### Network Optimization
- Request caching
- Offline support
- Background sync
- Request debouncing

## Testing

### Unit Tests
- Jest for component testing
- React Native Testing Library
- Mock API responses

### E2E Tests
- Detox for end-to-end testing
- Test scenarios for critical flows
- Automated testing pipeline

## Deployment

### App Store
- Automated builds using EAS Build
- TestFlight distribution
- App Store submission process

### Play Store
- Internal testing track
- Beta testing program
- Production release process

## Monitoring and Analytics

### Error Tracking
- Sentry integration
- Crash reporting
- Performance monitoring

### Analytics
- User behavior tracking
- Feature usage metrics
- Performance metrics

## Future Enhancements

### Planned Features
- Social sharing integration
- Advanced search filters
- Multi-language support
- Dark mode
- AR dock preview
- Weather integration
- Route planning

### Technical Improvements
- Performance optimization
- Accessibility improvements
- Offline capabilities
- Push notification enhancements
- Deep linking support

## Support and Maintenance

### Bug Reporting
- In-app feedback system
- Crash reporting
- User feedback collection

### Updates
- Regular security updates
- Feature updates
- Performance improvements
- Bug fixes

## Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS Simulator (for Mac)
- Android Studio (for Android development)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/dokkerr-mobile.git

# Install dependencies
cd dokkerr-mobile
npm install

# Start the development server
npm start
```

### Development Workflow
1. Create a feature branch
2. Implement changes
3. Write tests
4. Submit PR for review
5. Merge after approval
6. Deploy to staging
7. Test in production environment
8. Release to stores

## Contributing
Please refer to our [Contributing Guidelines](../development/contributing.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 