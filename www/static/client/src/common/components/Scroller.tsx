import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { debounce } from 'lodash';

interface ScrollerProps {
  itemHeight: number;
  children: React.ReactElement[];
  style?: {[key: string]: string};
}

const Scroller: React.FC<ScrollerProps> = (props: ScrollerProps) => {
  const { itemHeight, children, style } = props;
  const [reflowCount, setReflowCount] = useState(0);
  const debounced = debounce(() => {
    setReflowCount(reflowCount + 1);
  }, 200);

  const normalizedStyle = style ? style : {};

  useEffect(() => {
    window.addEventListener('scroll', debounced);

    return () => {
      window.removeEventListener('scroll', debounced);
    }
  });

  return <div style={style}>
    {
      children.map((c: React.ReactElement, i: number) => {
        return <ScrollerItem key={`scroller:item:${i}`} height={itemHeight} reflow={reflowCount}>{c}</ScrollerItem>
      })
    }
  </div>
}

interface ScrollerItemProps {
  reflow: number;
  height: number;
}

const ScrollerItem: React.FC<ScrollerItemProps> = (props: any) => {
  const { height } = props;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const v = (
        (rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.bottom >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
      );

      console.log(rect);
      console.log(isVisible);
      setIsVisible(v);
    }
  });

  const content = isVisible ?
    props.children :
    <ScrollerItemPlaceholder style={{height: height}}/>
  
  return (
    <div ref={ref}>
      { content }
    </div>
  )
}

const ScrollerItemPlaceholder = styled.div`
  background-color: #eeeeee;
  border: 1px solid #cccccc;
`;

export default Scroller;