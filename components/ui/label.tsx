import * as React from "react";

export const Label = ({text} : {text: string}) => {
	return (
		<span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {text}
    </span>
	);
};
