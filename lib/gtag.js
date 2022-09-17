export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID_PROD || process.env.NEXT_PUBLIC_GA_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const trackPageview = (url) => {
  // gtag('config', 'TAG_ID');
  gtag('event', 'page_view', {
    page_title: window.location.pathname,
    page_location: window.location.href, // Include the full URL
    page_path: window.location.pathname,
    send_to: GA_TRACKING_ID
  });
}

const getDefaultProperties = () => ({
  page_title: window.location.pathname,
  page_location: window.location.href, // Include the full URL
  page_path: window.location.pathname,
})

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = (action, {...rest}) => {
  window.gtag('event', action, {
    ...getDefaultProperties(),
    ...rest
  })
}