import { IBookings } from '@/interfaces/bookings.interface';
import { IEvents } from '@/interfaces/createBooking.interface';
import { IEventType } from '@/interfaces/packages.interface';

import { IEmployees } from '@/interfaces/employees.interface';
import { IPromoCode } from '@/interfaces/promoCodes.interface';
export const columns = [
  {
    name: 'Title',
    selector: (row: IBookings) => row.title,
    sortable: false,
  },
  {
    name: 'Client Name',
    selector: (row: IBookings) => row.clientName,
    sortable: true,
  },
  {
    name: 'Contact Number',
    selector: (row: IBookings) => row.contactNumber,
    sortable: true,
  },
  {
    name: 'Email',
    selector: (row: IBookings) => row.email,
    sortable: true,
  },
  {
    name: 'Event Count',
    selector: (row: IBookings) => row.eventCount,
    sortable: true,
  },
  {
    name: 'Payment Status',
    selector: (row: IBookings) => row.paymentStatus,
    sortable: true,
  },
  {
    name: 'Booking Status',
    selector: (row: IBookings) => row.bookingStatus,
    sortable: true,
  },
  // Add other columns if needed
];

export const data: IBookings[] = [
  {
    id: 1,
    title: 'Event 1',
    clientName: 'John Doe',
    contactNumber: '1234567890',
    email: 'john.doe@example.com',
    eventCount: 3,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 2,
    title: 'Event 2',
    clientName: 'Jane Smith',
    contactNumber: '9876543210',
    email: 'jane.smith@example.com',
    eventCount: 2,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  {
    id: 3,
    title: 'Event 3',
    clientName: 'Michael Johnson',
    contactNumber: '5554443333',
    email: 'michael.johnson@example.com',
    eventCount: 1,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 4,
    title: 'Event 4',
    clientName: 'Emily Brown',
    contactNumber: '9998887777',
    email: 'emily.brown@example.com',
    eventCount: 4,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 5,
    title: 'Event 5',
    clientName: 'William Davis',
    contactNumber: '1112223333',
    email: 'william.davis@example.com',
    eventCount: 2,
    paymentStatus: 'Pending',
    bookingStatus: 'Confirmed',
  },
  {
    id: 6,
    title: 'Event 6',
    clientName: 'Emma Davis',
    contactNumber: '1112223333',
    email: 'emma.davis@example.com',
    eventCount: 3,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 7,
    title: 'Event 7',
    clientName: 'Noah Wilson',
    contactNumber: '4445556666',
    email: 'noah.wilson@example.com',
    eventCount: 1,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  {
    id: 8,
    title: 'Event 8',
    clientName: 'Ava Taylor',
    contactNumber: '7778889999',
    email: 'ava.taylor@example.com',
    eventCount: 2,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 9,
    title: 'Event 9',
    clientName: 'Liam Clark',
    contactNumber: '5556667777',
    email: 'liam.clark@example.com',
    eventCount: 2,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 10,
    title: 'Event 10',
    clientName: 'Olivia Hernandez',
    contactNumber: '3334445555',
    email: 'olivia.hernandez@example.com',
    eventCount: 1,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  {
    id: 11,
    title: 'Event 11',
    clientName: 'Ethan Martinez',
    contactNumber: '8889990000',
    email: 'ethan.martinez@example.com',
    eventCount: 4,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 12,
    title: 'Event 12',
    clientName: 'Isabella Moore',
    contactNumber: '6667778888',
    email: 'isabella.moore@example.com',
    eventCount: 2,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 13,
    title: 'Event 13',
    clientName: 'Mason White',
    contactNumber: '9990001111',
    email: 'mason.white@example.com',
    eventCount: 1,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  {
    id: 14,
    title: 'Event 14',
    clientName: 'Charlotte Anderson',
    contactNumber: '7778889999',
    email: 'charlotte.anderson@example.com',
    eventCount: 2,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 15,
    title: 'Event 15',
    clientName: 'Elijah Thomas',
    contactNumber: '5556667777',
    email: 'elijah.thomas@example.com',
    eventCount: 3,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 16,
    title: 'Event 16',
    clientName: 'Amelia Rodriguez',
    contactNumber: '3334445555',
    email: 'amelia.rodriguez@example.com',
    eventCount: 1,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  {
    id: 17,
    title: 'Event 17',
    clientName: 'Carter Lee',
    contactNumber: '8889990000',
    email: 'carter.lee@example.com',
    eventCount: 4,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 18,
    title: 'Event 18',
    clientName: 'Luna Martinez',
    contactNumber: '6667778888',
    email: 'luna.martinez@example.com',
    eventCount: 2,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 19,
    title: 'Event 19',
    clientName: 'Miles Johnson',
    contactNumber: '9990001111',
    email: 'miles.johnson@example.com',
    eventCount: 1,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  {
    id: 20,
    title: 'Event 20',
    clientName: 'Harper Smith',
    contactNumber: '7778889999',
    email: 'harper.smith@example.com',
    eventCount: 2,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 21,
    title: 'Event 21',
    clientName: 'Evelyn Brown',
    contactNumber: '5556667777',
    email: 'evelyn.brown@example.com',
    eventCount: 3,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 22,
    title: 'Event 22',
    clientName: 'James Lopez',
    contactNumber: '3334445555',
    email: 'james.lopez@example.com',
    eventCount: 1,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  {
    id: 23,
    title: 'Event 23',
    clientName: 'Avery Gonzalez',
    contactNumber: '8889990000',
    email: 'avery.gonzalez@example.com',
    eventCount: 4,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 24,
    title: 'Event 24',
    clientName: 'Abigail Walker',
    contactNumber: '6667778888',
    email: 'abigail.walker@example.com',
    eventCount: 2,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
  {
    id: 25,
    title: 'Event 25',
    clientName: 'Benjamin Hill',
    contactNumber: '9990001111',
    email: 'benjamin.hill@example.com',
    eventCount: 1,
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },

  {
    id: 50,
    title: 'Event 50',
    clientName: 'Sam Johnson',
    contactNumber: '5558887777',
    email: 'sam.johnson@example.com',
    eventCount: 1,
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
  },
];

export const eventList: IEvents[] = [
  {
    eventTypeId: '1234',
    packageId: '5678',
    eventTitle: 'Birthday Party',
    eventDate: new Date('2023-07-27'),
    eventTime: '15:00',
    eventEndTime: '20:00',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 50,
    eventVenue: 'City Hall',
    eventVenueAddress: '123 Main Street, Dhaka',
    additionalInfo: 'Please bring your favorite dish to share!',
  },
  {
    eventTypeId: '5678',
    packageId: '9012',
    eventTitle: 'Wedding Reception',
    eventDate: new Date('2023-08-15'),
    eventTime: '18:30',
    eventEndTime: '23:00',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Outside Dhaka',
    numberOfGuests: 200,
    eventVenue: 'Garden Villa',
    eventVenueAddress: '456 Park Avenue, Chittagong',
  },
  {
    eventTypeId: '1234',
    packageId: '5678',
    eventTitle: 'Birthday Party',
    eventDate: new Date('2023-07-27'),
    eventTime: '15:00',
    eventEndTime: '20:00',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 50,
    eventVenue: 'City Hall',
    eventVenueAddress: '123 Main Street, Dhaka',
    additionalInfo: 'Please bring your favorite dish to share!',
  },
  {
    eventTypeId: '5678',
    packageId: '9012',
    eventTitle: 'Wedding Reception',
    eventDate: new Date('2023-08-15'),
    eventTime: '18:30',
    eventEndTime: '23:00',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Outside Dhaka',
    numberOfGuests: 200,
    eventVenue: 'Garden Villa',
    eventVenueAddress: '456 Park Avenue, Chittagong',
  },
  {
    eventTypeId: '7890',
    packageId: '1234',
    eventTitle: 'Corporate Conference',
    eventDate: new Date('2023-09-02'),
    eventTime: '09:00',
    eventEndTime: '17:00',
    dayOrEvening: 'Day',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 150,
    eventVenue: 'Conference Center',
    eventVenueAddress: '789 Business Road, Dhaka',
    additionalInfo: "Don't forget to bring your laptops!",
  },
  {
    eventTypeId: '2345',
    packageId: '6789',
    eventTitle: 'Anniversary Celebration',
    eventDate: new Date('2023-09-18'),
    eventTime: '19:00',
    eventEndTime: '22:00',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 80,
    eventVenue: 'Elegant Banquet',
    eventVenueAddress: '987 Gala Avenue, Dhaka',
  },
  {
    eventTypeId: '5678',
    packageId: '9012',
    eventTitle: 'Graduation Party',
    eventDate: new Date('2023-10-10'),
    eventTime: '16:00',
    eventEndTime: '21:00',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 70,
    eventVenue: 'Community Hall',
    eventVenueAddress: '246 Celebration Street, Dhaka',
    additionalInfo: 'Come celebrate this special achievement!',
  },
  {
    eventTypeId: '7890',
    packageId: '1234',
    eventTitle: 'Music Concert',
    eventDate: new Date('2023-11-05'),
    eventTime: '20:00',
    eventEndTime: '23:00',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 300,
    eventVenue: 'Music Arena',
    eventVenueAddress: '543 Harmony Road, Dhaka',
  },
  {
    eventTypeId: '2345',
    packageId: '6789',
    eventTitle: 'Baby Shower',
    eventDate: new Date('2023-12-20'),
    eventTime: '14:30',
    eventEndTime: '17:30',
    dayOrEvening: 'Afternoon',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 40,
    eventVenue: 'Cozy Cafe',
    eventVenueAddress: '753 Joyful Avenue, Dhaka',
  },
  {
    eventTypeId: '5678',
    packageId: '9012',
    eventTitle: 'Charity Gala',
    eventDate: new Date('2024-01-08'),
    eventTime: '19:30',
    eventEndTime: '23:30',
    dayOrEvening: 'Evening',
    dhakaOrOutside: 'Dhaka',
    numberOfGuests: 120,
    eventVenue: 'Grand Ballroom',
    eventVenueAddress: '369 Generosity Street, Dhaka',
    additionalInfo: 'All proceeds go to a noble cause!',
  },
];

export const eventsColumns = [
  {
    name: 'Event Title',
    selector: (row: IEvents) => row.eventTitle,
    sortable: false,
  },
  {
    name: 'Event Date',
    selector: (row: IEvents) => row.eventDate.toISOString().split('T')[0],
    sortable: true,
  },
  {
    name: 'Event Time',
    selector: (row: IEvents) => row.eventTime,
    sortable: true,
  },

  {
    name: 'Dhaka/Outside Dhaka',
    selector: (row: IEvents) => row.dhakaOrOutside,
    sortable: true,
  },
  {
    name: 'Event Venue',
    selector: (row: IEvents) => row.eventVenue,
    sortable: true,
  },
  {
    name: 'Event Venue Address',
    selector: (row: IEvents) => row.eventVenueAddress,
    sortable: false,
  },
];

export const eventTypesData: IEventType[] = [
  {
    id: '1',
    title: 'Birthday',
    description:
      'Capture the joy and excitement of your special day with our professional birthday photography services.',
    image:
      'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    packages: [
      {
        id: '1',
        title: 'Basic Package',
        description:
          'Our basic package includes 2 hours of coverage, digital photo delivery, and 20 edited images.',
        price: 150,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '2',
        title: 'Premium Package',
        description:
          'The premium package includes 4 hours of coverage, digital photo delivery, 40 edited images, and a custom photo album.',
        price: 300,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  },
  {
    id: '2',
    title: 'Wedding',
    description:
      'Preserve the romance and beauty of your wedding day with our expert wedding photography services.',
    image:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    packages: [
      {
        id: '1',
        title: 'Silver Package',
        description:
          'Our silver package offers 6 hours of coverage, digital photo delivery, 50 edited images, and a personalized online gallery.',
        price: 500,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '2',
        title: 'Gold Package',
        description:
          'The gold package includes 10 hours of coverage, digital photo delivery, 100 edited images, a custom photo album, and a pre-wedding photoshoot.',
        price: 1000,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '3',
        title: 'Platinum Package',
        description:
          'For the ultimate experience, our platinum package provides full-day coverage, digital photo delivery, 150 edited images, a custom photo album, a pre-wedding photoshoot, and a second photographer.',
        price: 2000,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  },
  {
    id: '3',
    title: 'Corporate',
    description:
      'Enhance your corporate events with our professional photography services to capture important moments and branding.',
    image:
      'https://images.unsplash.com/photo-1561489413-985b06da5bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    packages: [
      {
        id: '1',
        title: 'Basic Coverage',
        description:
          'Our basic coverage package includes 3 hours of event photography, digital photo delivery, and 30 edited images.',
        price: 250,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '2',
        title: 'Full Event Package',
        description:
          'The full event package provides 6 hours of coverage, digital photo delivery, 60 edited images, and a branded online gallery for easy sharing.',
        price: 500,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '3',
        title: 'Conference Package',
        description:
          'For multi-day conferences, this package includes full coverage, digital photo delivery, 100 edited images, a custom photo album, and two photographers.',
        price: 1000,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  },
  {
    id: '4',
    title: 'Charity',
    description:
      'Capture the joy and excitement of your special day with our professional birthday photography services.',
    image:
      'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    packages: [
      {
        id: '1',
        title: 'Basic Package',
        description:
          'Our basic package includes 2 hours of coverage, digital photo delivery, and 20 edited images.',
        price: 150,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
      {
        id: '2',
        title: 'Premium Package',
        description:
          'The premium package includes 4 hours of coverage, digital photo delivery, 40 edited images, and a custom photo album.',
        price: 300,
        image:
          'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      },
    ],
  },
];

export const employeeData: IEmployees[] = [
  {
    fullname: 'John Doe',
    email: 'john.doe@example.com',
    contactPrimary: '123-456-7890',
    position: 'Software Engineer',
    role: 'Developer',
  },
  {
    fullname: 'Jane Smith',
    email: 'jane.smith@example.com',
    contactPrimary: '987-654-3210',
    position: 'Product Manager',
    role: 'Manager',
  },
  {
    fullname: 'Michael Johnson',
    email: 'michael.johnson@example.com',
    contactPrimary: '555-123-4567',
    position: 'Data Scientist',
    role: 'Analyst',
  },
  {
    fullname: 'Emily Lee',
    email: 'emily.lee@example.com',
    contactPrimary: '444-567-8901',
    position: 'UX Designer',
    role: 'Designer',
  },
  {
    fullname: 'David Wang',
    email: 'david.wang@example.com',
    contactPrimary: '777-888-9999',
    position: 'Software Engineer',
    role: 'Developer',
  },
  {
    fullname: 'Jessica Chen',
    email: 'jessica.chen@example.com',
    contactPrimary: '222-333-4444',
    position: 'Marketing Specialist',
    role: 'Marketing',
  },
  {
    fullname: 'Matthew Brown',
    email: 'matthew.brown@example.com',
    contactPrimary: '888-777-6666',
    position: 'Sales Representative',
    role: 'Sales',
  },
  {
    fullname: 'Sophia Kim',
    email: 'sophia.kim@example.com',
    contactPrimary: '666-555-4444',
    position: 'HR Manager',
    role: 'HR',
  },
  {
    fullname: 'William Liu',
    email: 'william.liu@example.com',
    contactPrimary: '111-222-3333',
    position: 'Financial Analyst',
    role: 'Finance',
  },
  {
    fullname: 'Olivia Garcia',
    email: 'olivia.garcia@example.com',
    contactPrimary: '333-444-5555',
    position: 'Operations Manager',
    role: 'Operations',
  },
];

export const promoCodeData: IPromoCode[] = [
  {
    code: 'CODE1',
    discountPercentage: '10%',
    maxUsage: '100',
    expiryDate: '2023-12-31',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE2',
    discountPercentage: '20%',
    maxUsage: '50',
    expiryDate: '2023-09-30',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE3',
    discountPercentage: '15%',
    maxUsage: '200',
    expiryDate: '2023-11-15',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE4',
    discountPercentage: '25%',
    maxUsage: '75',
    expiryDate: '2023-10-31',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE5',
    discountPercentage: '30%',
    maxUsage: '30',
    expiryDate: '2023-12-15',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE6',
    discountPercentage: '5%',
    maxUsage: '500',
    expiryDate: '2023-11-30',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE7',
    discountPercentage: '12%',
    maxUsage: '150',
    expiryDate: '2023-10-15',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE8',
    discountPercentage: '18%',
    maxUsage: '80',
    expiryDate: '2023-09-15',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE9',
    discountPercentage: '8%',
    maxUsage: '250',
    expiryDate: '2023-11-01',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE10',
    discountPercentage: '22%',
    maxUsage: '120',
    expiryDate: '2023-10-31',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE11',
    discountPercentage: '17%',
    maxUsage: '180',
    expiryDate: '2023-12-31',
    status: 'Active',
    createdAt: '2023-08-15',
  },
  {
    code: 'CODE12',
    discountPercentage: '14%',
    maxUsage: '100',
    expiryDate: '2023-09-30',
    status: 'Active',
    createdAt: '2023-08-15',
  },
];
