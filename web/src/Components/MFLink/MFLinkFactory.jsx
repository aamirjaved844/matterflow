import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import MFLinkModel from './MFLinkModel';

export default class MFLinkFactory extends DefaultLinkFactory {

    generateModel() {
        return new MFLinkModel();
    }
}
