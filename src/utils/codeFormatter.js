
export const formatHTMLPreview = (html) => {
    if (!html) return '';
    

    const sanitizedHTML = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .trim();
    
    return sanitizedHTML;
  };
  
  export const identifyLanguage = (code) => {

    if (code.includes('<html') || code.includes('<body') || code.includes('<div')) {
      return 'html';
    } else if (code.includes('function') && (code.includes('{') || code.includes('=>'))) {
      return 'javascript';
    } else if (code.includes('import React') || code.includes('from "react"') || code.includes('className=')) {
      return 'jsx';
    } else if (code.includes('class') && code.includes('public') && code.includes('{')) {
      return 'java';
    } else if (code.includes('def') && code.includes(':')) {
      return 'python';
    } else if (code.includes('#include') && (code.includes('<stdio.h>') || code.includes('<iostream>'))) {
      return code.includes('<iostream>') ? 'cpp' : 'c';
    } else if (code.includes('package') && code.includes('func') && code.includes('{')) {
      return 'go';
    } else if (code.includes('using namespace') || code.includes('std::')) {
      return 'cpp';
    }
    
    return 'plaintext';
  };