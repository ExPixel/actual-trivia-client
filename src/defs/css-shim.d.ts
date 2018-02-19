declare module "*.css" {
    interface IStyleMap {
        [styleName: string]: string;
    }

    const styleMap: IStyleMap;    
    export = styleMap;
}