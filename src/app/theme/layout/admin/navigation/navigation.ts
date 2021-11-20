import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/dashboard/users',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'master',
        title: 'Master',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'country',
            title: 'Country',
            type: 'item',
            url: '/basic/button'
          },
          {
            id: 'rate_list',
            title: 'Rate List',
            type: 'item',
            url: '/basic/badges'
          },
          {
            id: 'time_slot',
            title: 'Time Slot',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'holiday_list',
            title: 'Holiday List',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'promo_code',
            title: 'Promo Code',
            type: 'item',
            url: '/basic/tabs-pills'
          }
        ]
      },
      {
        id: 'appointments',
        title: 'Appointments',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'search_appointments',
            title: 'Appointments',
            type: 'item',
            url: '/dashboard/appointments'
          },
          {
            id: 'pending_appointments',
            title: 'Pending Appointments',
            type: 'item',
            url: '/dashboard/pending-appointments'
          },
          {
            id: 'cancelled_appointments',
            title: 'Cancelled Appointments',
            type: 'item',
            url: '/basic/breadcrumb-paging'
          },
          {
            id: 'completed_appointments',
            title: 'Completed Appointments',
            type: 'item',
            url: '/basic/collapse'
          },
          {
            id: 'refund',
            title: 'Refund Appointments List',
            type: 'item',
            url: '/basic/tabs-pills'
          }
        ]
      },
      {
        id: 'contact',
        title: 'Contact',
        type: 'item',
        url: '/dashboard/contact',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'enquire',
        title: 'Enquire',
        type: 'item',
        url: '/dashboard/contact',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'feedback',
        title: 'Feedback',
        type: 'item',
        url: '/dashboard/contact',
        icon: 'feather icon-home',
        classes: 'nav-item',
      }
    ]
  },
  // {
  //   id: 'ui-element',
  //   title: 'UI ELEMENT',
  //   type: 'group',
  //   icon: 'icon-ui',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Component',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/basic/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/basic/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumb & Pagination',
  //           type: 'item',
  //           url: '/basic/breadcrumb-paging'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/basic/collapse'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/basic/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/basic/typography'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'forms',
  //   title: 'Forms & Tables',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'forms-element',
  //       title: 'Form Elements',
  //       type: 'item',
  //       url: '/forms/basic',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text'
  //     },
  //     {
  //       id: 'tables',
  //       title: 'Tables',
  //       type: 'item',
  //       url: '/tables/bootstrap',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server'
  //     }
  //   ]
  // },
  // {
  //   id: 'chart-maps',
  //   title: 'Chart & Maps',
  //   type: 'group',
  //   icon: 'icon-charts',
  //   children: [
  //     {
  //       id: 'charts',
  //       title: 'Charts',
  //       type: 'item',
  //       url: '/charts/morris',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart'
  //     }
  //   ]
  // },
  // {
  //   id: 'pages',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-pages',
  //   children: [
  //     {
  //       id: 'auth',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'feather icon-lock',
  //       children: [
  //         {
  //           id: 'signup',
  //           title: 'Sign up',
  //           type: 'item',
  //           url: '/auth/signup',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'signin',
  //           title: 'Sign in',
  //           type: 'item',
  //           url: '/auth/signin',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     },
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     },
  //     {
  //       id: 'disabled-menu',
  //       title: 'Disabled Menu',
  //       type: 'item',
  //       url: 'javascript:',
  //       classes: 'nav-item disabled',
  //       icon: 'feather icon-power',
  //       external: true
  //     },
  //     {
  //       id: 'buy_now',
  //       title: 'Buy Now',
  //       type: 'item',
  //       icon: 'feather icon-book',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.com/item/datta-able-angular/',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
