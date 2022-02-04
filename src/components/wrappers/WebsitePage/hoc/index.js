/* eslint-disable react/jsx-props-no-spreading */
// high order component

import React from 'react';
import WebsitePageWrapper from '..';
import WebsiteGlobalProvider from '../provider';

export default function websitePageHOC(PageComponent, { pageWrapperProps }) {
  // eslint-disable-next-line func-names
  return function (props) {
    return (
      <WebsiteGlobalProvider>
        <WebsitePageWrapper {...pageWrapperProps}>
          <PageComponent {...props} />
        </WebsitePageWrapper>
      </WebsiteGlobalProvider>
    );
  };
}
