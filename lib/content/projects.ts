import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'courier-management-system',
    name: 'Courier Management System',
    focus: 'Cross-border logistics, real-time data synchronization, and shipment visibility.',
    bullets: [
      [{ text: 'Developed a cross-border logistics platform specializing in China-to-Malaysia freight forwarding and parcel consolidation.' }],
      [{ text: 'Engineered a robust cross-border data pipeline utilizing secure API protocols to synchronize real-time parcel manifests with overseas WMS providers.' }],
      [{ text: 'Designed a user-centric consolidation module allowing clients to manage virtual inventory, select specific parcels for packing, and initiate international shipping.' }],
      [{ text: 'Architected a milestone tracking engine that aggregates multi-carrier data into a unified API, providing end-to-end visibility for international shipments.' }],
      [{ text: "Optimized the Pick & Pack workflow by digitizing the communication between the client's front-end selection and the warehouse fulfillment team." }],
    ],
    stack: ['Laravel', 'Inertia.js', 'Vue.js', 'MySQL', 'AWS', 'Cloudflare'],
  },
  {
    slug: 'flories-ecommerce-system',
    name: 'Flories E-commerce System',
    focus: 'Integration (Shopify), resource optimization, and event-driven automation.',
    bullets: [
      [{ text: 'Architected a high-concurrency fulfillment middleware that bridges Shopify storefronts with localized workshop and logistics workflows.' }],
      [{ text: 'Engineered a real-time synchronization engine to pull orders and inventory data from Shopify via Webhooks/REST API, ensuring 100% data consistency.' }],
      [{ text: 'Designed a dynamic dispatching algorithm to optimize resource allocation between floral production (artisans) and last-mile delivery (drivers).' }],
      [{ text: 'Developed an event-driven notification architecture to trigger automated, customer-facing delivery alerts, significantly reducing manual support overhead.' }],
      [{ text: 'Built a unified order management interface supporting both synchronized e-commerce data and manual entry for offline/B2B sales.' }],
    ],
    stack: ['Laravel', 'MySQL', 'AWS', 'Cloudflare'],
  },
  {
    slug: 'saas-crm-system',
    name: 'SaaS CRM System',
    focus: 'Multi-tenancy, scalable architecture, and data isolation.',
    bullets: [
      [{ text: 'Designed and deployed a scalable multi-tenant architecture featuring automated environment provisioning and subscription lifecycle management.' }],
      [{ text: 'Engineered a centralized Lead-to-Cash pipeline, automating the conversion of prospects into revenue via integrated quotation and invoicing modules.' }],
      [{ text: 'Developed a secure PDF generation and distribution engine to automate the delivery of financial records directly to end-customers via email.' }],
      [{ text: 'Implemented an integrated Task Management module, providing clients with a unified interface to track project milestones and daily operations alongside customer data.' }],
      [{ text: 'Implemented strict data isolation strategies and optimized persistence layers to ensure security and performance across diverse client environments.' }],
    ],
    stack: ['Laravel', 'Inertia.js', 'Vue.js', 'MySQL', 'AWS', 'Cloudflare'],
  },
];
