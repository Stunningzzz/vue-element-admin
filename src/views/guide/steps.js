const steps = [
  {
    element: '#aside-nav-container',
    popover: {
      title: 'Navigation Sidebar',
      description: 'Click the jump other page',
      position: 'right',
    },
  },
  {
    element: '#hamburger-container',
    popover: {
      title: 'Hamburger',
      description: 'Open && Close sidebar',
      position: 'bottom',
    },
  },

  {
    element: '#breadcrumb-container',
    popover: {
      title: 'Breadcrumb',
      description: 'Indicate the current page location',
      position: 'bottom',
    },
  },
  {
    element: '#header-search',
    popover: {
      title: 'Page Search',
      description: 'Page search, quick navigation',
      position: 'left',
    },
  },
  {
    element: '#full-screen',
    popover: {
      title: 'Screenfull',
      description: 'Set the page into fullscreen',
      padding:10,
      position: 'left',
    },
  },
  {
    element: '#size-select',
    popover: {
      title: 'Switch Size',
      description: 'Switch the system size',
      position: 'left',
    },
  },
  {
    element: '#page-settings-button',
    popover: {
      title: 'Page Settings',
      description: 'Set the pages overall style',
      position: 'left',
    },
  },
];

export default steps;
