import { DefaultPortModel } from '@projectstorm/react-diagrams';
import MFLinkFactory from '../MFLink/MFLinkFactory';

export default class MFPortModel extends DefaultPortModel {

      createLinkModel() {
          const factory = new MFLinkFactory();
          return factory.generateModel();
      }

      canLinkToPort(port) {
          if (port == null) {
            return false;
          }
          // if connecting to flow port, make sure this is a flow port
          // and opposite of other's direction
          if (port.options.name.includes("flow")) {
              return this.options.name.includes("flow")
                  && this.options.in !== port.options.in
          // otherwise, make sure this is NOT a flow port, and ensure
          // in/out compatibility
          } else {
              return !this.options.name.includes("flow")
                  && this.options.in !== port.options.in
          }
      }
}
