class Util {
    static matchesPartial<T>(obj: T, partialObj: Partial<T>): boolean {
        for (const key in partialObj) {
            if (!(key in obj)) {
                return false;
            }

            const partialObjValue = partialObj[key];
            const objValue = obj[key];

            if (objValue instanceof Buffer) {
                if (partialObjValue == null) {
                    return false;
                }
                
                const jsonBuffer = partialObjValue as { [k: string]: any };

                if (Buffer.from(jsonBuffer.data).toString() !== objValue.toString()) {
                    return false;
                }
            }
            else if (
                typeof partialObjValue === 'object'
                && partialObjValue !== null 
                && typeof objValue === 'object'
                && objValue !== null
                && !Array.isArray(partialObjValue)
                && !Array.isArray(objValue)
            ) {
                if (!this.matchesPartial(objValue, partialObjValue)) {
                    return false;
                }
            } else if (partialObjValue !== objValue) {
                return false;    
            }
        }

        return true;
    }

    static async waitFor(checkCondition: () => boolean, timeoutMs: number): Promise<boolean> {
        const checkIntervalMs = 100;
    
        const timeout = new Promise<boolean>((resolve) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                resolve(false);
            }, timeoutMs);
        });
    
        const condition = new Promise<boolean>(async (resolve) => {
            while (true) {
                if (checkCondition()) {
                    resolve(true);
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, checkIntervalMs));
            }
        });
    
        return Promise.race([timeout, condition]);
    }

    static inicializarMassas(listaArquivos: string[], objDados: SimpleStringMap) {
        listaArquivos.forEach((arquivo: string, indexArquivo: number, lista: string[]) => {
            cy.fixture(`${Cypress.env("estagioDev")}/${arquivo}`).then((dados) => {
                objDados[arquivo] = dados;
            });
        });
    }

    static getRandomPhone() {
        return Math.floor(Math.random() * 99999999999 + 1);
    }

    static getRandomPassword() {
        return Math.random().toString(36).slice(-7);
    }

    static getRandomCodeNoSize(){
        return this.getRandomCode(6);
    }

    static getRandomCode(tamanho: number) {
        const letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let aleatorio = '';
        for (let i = 0; i < tamanho; i++) {
            const rnum = Math.floor(Math.random() * letras.length);
            aleatorio += letras.substring(rnum, rnum + 1);
        }
        return aleatorio;
    }

    static screenshot(): void {
        const dateFull = new Date();

        var d = dateFull.getDate();
        var m = dateFull.getMonth() + 1;
        var y = dateFull.getFullYear();
        var h = dateFull.getHours();
        var m = dateFull.getMinutes();
        var s = dateFull.getSeconds();

        var dateTimeCurrent = `${y}-${(m<=9 ? `0${m}` : m)}-${(d <= 9 ? `0${d}` : d)}T${h}:${m}:${s}`;

        cy.screenshot(dateTimeCurrent);
    }

    static treatText(tratamento: string){
        tratamento = tratamento.trim()
        tratamento = tratamento.replace('\u00a0', ' ')
        return tratamento
    }
    
    static filterNumberFromString(numeroTexto: string): string | null {
        const numberMatchingRegExp = /\d+[\,,\.]*\d*/g;
    
        if (numeroTexto) {
            let resultadoNumeroTexto = numeroTexto.match(numberMatchingRegExp);

            if (resultadoNumeroTexto === null) {
                return null;
            }

            return resultadoNumeroTexto[0];
        }
    
        return numeroTexto
    }
}

interface SimpleStringMap {
    [k: string] : any
}

export {SimpleStringMap, Util};