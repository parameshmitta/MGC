import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export const useSEO = ({ title, description, keywords }: SEOProps) => {
  useEffect(() => {
    // Update Title
    const formattedTitle = `${title} | Maha Ganapati Committee, Bandarupally`;
    document.title = formattedTitle;

    // Update Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    const finalDesc = description || "Official portal of Maha Ganapati Committee Bandarupally. Connect, participate, report issues, and follow our community activities.";
    metaDescription.setAttribute('content', finalDesc);

    // Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    const finalKeywords = keywords || "Ganesh, Ganapati, Bandarupally, Committee, Village Portal, Ganesh Chaturthi, Events, Gallery";
    metaKeywords.setAttribute('content', finalKeywords);

    // Update OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', formattedTitle);

    // Update OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', finalDesc);
  }, [title, description, keywords]);
};
