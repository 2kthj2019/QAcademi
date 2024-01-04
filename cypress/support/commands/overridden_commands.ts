interface CustomTypeOptions extends Cypress.TypeOptions {
    sensitive?: boolean;
}

Cypress.Commands.overwrite(
    "type",
    (
        originalFn: any,
        prevSubject: any,
        text: any,
        options?: Partial<CustomTypeOptions>
    ) => {
        if (options && options.sensitive) {
        // turn off original log
        options.log = false;
        // create our own log with masked message
        Cypress.log({
            $el: prevSubject,
            name: "type",
            message: "*".repeat(text.length),
        });
        }
        return originalFn(prevSubject, text, options);
    }
);

export { CustomTypeOptions };