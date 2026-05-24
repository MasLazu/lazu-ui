import * as React from "react";

import { Section, type SectionProps } from "./section";

export interface FormSectionProps extends Omit<SectionProps, "inset"> {}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(function FormSection(props, ref) {
  return <Section ref={ref} inset {...props} />;
});

FormSection.displayName = "FormSection";

export { FormSection };
