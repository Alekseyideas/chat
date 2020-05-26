import React from 'react';
import styled from 'styled-components';

export const YouTubeBox = () => {
  return (
    <WrapperS>
      <iframe
        title="Yt"
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/gOIusx-9DHs"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </WrapperS>
  );
};

const WrapperS = styled.div`
  width: 100%;
`;
