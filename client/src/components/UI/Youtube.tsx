import React from 'react';

interface Props {
  src: string;
  visible?: boolean;
  isAutoPlay?: boolean;
}

const Youtube: React.FC<Props> = ({ src, visible, isAutoPlay }) => (
  <iframe
    style={{
      borderRadius: 20,
      visibility: visible ? 'visible' : 'hidden',
    }}
    width={visible ? 460 : 0}
    height={visible ? 260 : 0}
    src={src + (isAutoPlay && '?&autoplay=1')}
    frameBorder="0"
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
);

export default Youtube;
