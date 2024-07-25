import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import MFPortModel from './MFPortModel';

export default class MFPortFactory extends AbstractModelFactory {

    constructor() {
        super("mf-port");
    }

    generateModel() {
        return new MFPortModel({name: 'mf-port-name'});
    }
}
