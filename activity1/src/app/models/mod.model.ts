export class Mod {
    public modCode: number;
    public modName: string;
    public modDownloads: number;
    public modOwner: string;
    public modState: boolean;
    public modIcon: string;
    public modBase64: string;

    constructor(cod: number, nme: string, dwl: number, own: string, stt: boolean, img: string, b64: string) {
        this.modCode = cod;
        this.modName = nme;
        this.modDownloads = dwl;
        this.modOwner = own;
        this.modState = stt;
        this.modIcon = img;
        this.modBase64 = b64;
    }
}
