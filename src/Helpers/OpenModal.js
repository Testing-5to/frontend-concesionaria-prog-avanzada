import {createContext} from 'react'

const OpenModeloModalContext = createContext({
    openModeloModal: false,
    setOpenModeloModal: () => {}
});

const OpenMarcaModalContext= createContext({
    openMarcaModal: false,
    setOpenMarcaModal: () => {}
});

export {OpenModeloModalContext, OpenMarcaModalContext};