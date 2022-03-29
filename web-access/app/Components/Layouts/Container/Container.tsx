import { FunctionComponent } from 'react';

/**
 * Container component with min screen height.
 */
const Container: FunctionComponent = ({ children }) => {
  return (
    <div className="bg-neutral-0 text-neutral-800 min-h-screen flex flex-row mx-auto justify-center items-center space-y-5">
      {children}
    </div>
  );
};

export default Container;
