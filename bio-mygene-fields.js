import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-ajax/iron-ajax";

/**
 * `bio-mygene-fields` The 'bio-mygene-fields' element displays the available query fields from MyGene.info.
 *
 * @customElement
 * @polymer
 * @demo
 *
 */
class BioMygeneFields extends PolymerElement {
  static get properties() {
    return {
      data: { type: Array },
      selectedFields: { type: Array }
    };
  }

  static get template() {
    return html`
      <iron-ajax
        auto=""
        id="ajax"
        url="https://mygene.info/v3/metadata"
        handleas="json"
        on-response="handleResponse"
        on-core-error="handleError"
      >
      </iron-ajax>

      <select
        id="listBox"
        multiple="true"
        size="10"
        on-change="fieldSelectHandler"
      >
        <template is="dom-repeat" items="{{data}}" as="field">
          <option value="{{field}}">{{field}}</option>
        </template>
      </select>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }

  fieldSelectHandler() {
    var options = this.$.listBox.selectedOptions;

    var selFields = [];
    for (var i = 0; i < options.length; i++) {
      selFields.push(options[i].value);
    }
    this.selectedFields = selFields;
    this.dispatchEvent(
      new CustomEvent("selectedFieldsChanged", {
        bubbles: true,
        composed: true,
        detail: {
          model: selFields
        }
      })
    );
  }

  handleResponse() {
    this.data = response.detail.response.available_fields;
  }

  handleError() {
    console.log("error " + this.ajax.error);
  }
}

customElements.define("bio-mygene-fields", BioMygeneFields);
