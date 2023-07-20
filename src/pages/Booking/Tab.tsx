import React, { useEffect, useRef } from "react";

const Tab = ({ children, value, onChangeView, activeTab }: any) => {
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(tabRef.current);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("tab ", value);
            onChangeView(value);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );
    observer.observe(tabRef.current!);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeTab === value) {
      tabRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div ref={tabRef} onClick={() => onChangeView(value)}>
      {children}
    </div>
  );
};

export default Tab;
