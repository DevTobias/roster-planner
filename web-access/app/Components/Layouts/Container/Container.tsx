import { FunctionComponent } from 'react';

/**
 * Container component with min screen height.
 */
const Container: FunctionComponent = ({ children }) => {
  return (
    <div className="bg-neutral-0 text-neutral-800 min-h-screenInner flex flex-row mx-auto justify-center items-center space-y-5 container">
      {children}
    </div>
  );
};

export default Container;
