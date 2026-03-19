'use client';

import { useAnimateOnView } from '@/hooks/useAnimateOnView';

export default function Projects() {
  const titleRef = useAnimateOnView<HTMLHeadingElement>({
    animationProps: {
      translateY: [25, 0],
      ease: 'outExpo',
      duration: 1000,
    },
  });

  const card1Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [35, 0],
      scale: [0.97, 1],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 100,
  });

  const card2Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [35, 0],
      scale: [0.97, 1],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 250,
  });

  const card3Ref = useAnimateOnView<HTMLDivElement>({
    animationProps: {
      translateY: [35, 0],
      scale: [0.97, 1],
      ease: 'outCubic',
      duration: 900,
    },
    delay: 400,
  });

  return (
    <section className="mb-10">
      <h2
        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
        ref={titleRef}
      >
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg" ref={card1Ref}>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Courier Management System</h3>
          <p className="text-sm">
            Focus on: Cross-border logistics, real-time data synchronization, and shipment visibility.
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              Developed a cross-border logistics platform specializing in China-to-Malaysia freight forwarding and parcel consolidation.
            </li>
            <li>
              Engineered a robust cross-border data pipeline utilizing secure API protocols to synchronize real-time parcel manifests with overseas WMS providers.
            </li>
            <li>
              Designed a user-centric consolidation module allowing clients to manage virtual inventory, select specific parcels for packing, and initiate international shipping.
            </li>
            <li>
              Architected a milestone tracking engine that aggregates multi-carrier data into a unified API, providing end-to-end visibility for international shipments.
            </li>
            <li>
              Optimized the Pick &amp; Pack workflow by digitizing the communication between the client&apos;s front-end selection and the warehouse fulfillment team.
            </li>
          </ul>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span>Built with:</span>
            <br />
            Laravel • Inertia.js • Vue.js • MySQL • AWS • Cloudflare
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg" ref={card2Ref}>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Flories E-commerce System</h3>
          <p className="text-sm">
            Focus on: Integration (Shopify), resource optimization, and event-driven automation.
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              Architected a high-concurrency fulfillment middleware that bridges Shopify storefronts with localized workshop and logistics workflows.
            </li>
            <li>
              Engineered a real-time synchronization engine to pull orders and inventory data from Shopify via Webhooks/REST API, ensuring 100% data consistency.
            </li>
            <li>
              Designed a dynamic dispatching algorithm to optimize resource allocation between floral production (artisans) and last-mile delivery (drivers).
            </li>
            <li>
              Developed an event-driven notification architecture to trigger automated, customer-facing delivery alerts, significantly reducing manual support overhead.
            </li>
            <li>
              Built a unified order management interface supporting both synchronized e-commerce data and manual entry for offline/B2B sales.
            </li>
          </ul>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span>Built with:</span>
            <br />
            Laravel • MySQL • AWS • Cloudflare
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg" ref={card3Ref}>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">SaaS CRM System</h3>
          <p className="text-sm">
            Focus on: Multi-tenancy, scalable architecture, and data isolation.
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              Designed and deployed a scalable multi-tenant architecture featuring automated environment provisioning and subscription lifecycle management.
            </li>
            <li>
              Engineered a centralized Lead-to-Cash pipeline, automating the conversion of prospects into revenue via integrated quotation and invoicing modules.
            </li>
            <li>
              Developed a secure PDF generation and distribution engine to automate the delivery of financial records directly to end-customers via email.
            </li>
            <li>
              Implemented an integrated Task Management module, providing clients with a unified interface to track project milestones and daily operations alongside customer data.
            </li>
            <li>
              Implemented strict data isolation strategies and optimized persistence layers to ensure security and performance across diverse client environments.
            </li>
          </ul>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            <span>Built with:</span>
            <br />
            Laravel • Inertia.js • Vue.js • MySQL • AWS • Cloudflare
          </div>
        </div>
      </div>
    </section>
  );
}