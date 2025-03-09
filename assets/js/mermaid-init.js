document.addEventListener("DOMContentLoaded", function() {
  mermaid.initialize({
    startOnLoad: true,
    securityLevel: 'loose',
    theme: 'default',
    logLevel: 'error',
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: 'linear'
    },
    er: {
      useMaxWidth: false
    },
    sequence: {
      useMaxWidth: false,
      noteFontWeight: '14px',
      actorFontSize: '14px',
      messageFontSize: '16px'
    }
  });
  
  // Manual initialization to handle edge cases
  setTimeout(function() {
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
  }, 500);
});
