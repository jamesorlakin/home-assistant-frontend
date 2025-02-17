import {
  mdiGarage,
  mdiGarageOpen,
  mdiLightbulb,
  mdiLightbulbOff,
} from "@mdi/js";
import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators";
import { ifDefined } from "lit/directives/if-defined";
import { repeat } from "lit/directives/repeat";
import "../../../../src/components/ha-bar-switch";
import "../../../../src/components/ha-card";

const switches: {
  id: string;
  label: string;
  class?: string;
  reversed?: boolean;
  disabled?: boolean;
}[] = [
  {
    id: "switch",
    label: "Switch",
  },
  {
    id: "switch-reversed",
    label: "Switch Reversed",
    reversed: true,
  },
  {
    id: "switch-custom",
    label: "Switch and custom style",
    class: "custom",
  },
  {
    id: "switch-disabled",
    label: "Disabled Switch",
    disabled: true,
  },
];

@customElement("demo-components-ha-bar-switch")
export class DemoHaBarSwitch extends LitElement {
  @state() private checked = false;

  handleValueChanged(e: any) {
    this.checked = e.target.checked as boolean;
  }

  protected render(): TemplateResult {
    return html`
      ${repeat(switches, (sw) => {
        const { id, label, ...config } = sw;
        return html`
          <ha-card>
            <div class="card-content">
              <label id=${id}>${label}</label>
              <pre>Config: ${JSON.stringify(config)}</pre>
              <ha-bar-switch
                .checked=${this.checked}
                class=${ifDefined(config.class)}
                @change=${this.handleValueChanged}
                .pathOn=${mdiLightbulb}
                .pathOff=${mdiLightbulbOff}
                aria-labelledby=${id}
                disabled=${ifDefined(config.disabled)}
                reversed=${ifDefined(config.reversed)}
              >
              </ha-bar-switch>
            </div>
          </ha-card>
        `;
      })}
      <ha-card>
        <div class="card-content">
          <p class="title"><b>Vertical</b></p>
          <div class="vertical-switches">
            ${repeat(switches, (sw) => {
              const { id, label, ...config } = sw;
              return html`
                <ha-bar-switch
                  .checked=${this.checked}
                  vertical
                  class=${ifDefined(config.class)}
                  @change=${this.handleValueChanged}
                  aria-label=${label}
                  .pathOn=${mdiGarageOpen}
                  .pathOff=${mdiGarage}
                  disabled=${ifDefined(config.disabled)}
                  reversed=${ifDefined(config.reversed)}
                >
                </ha-bar-switch>
              `;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      ha-card {
        max-width: 600px;
        margin: 24px auto;
      }
      pre {
        margin-top: 0;
        margin-bottom: 8px;
      }
      p {
        margin: 0;
      }
      label {
        font-weight: 600;
      }
      .custom {
        --switch-bar-on-color: rgb(var(--rgb-green-color));
        --switch-bar-off-color: rgb(var(--rgb-red-color));
        --switch-bar-thickness: 100px;
        --switch-bar-border-radius: 24px;
        --switch-bar-padding: 6px;
        --mdc-icon-size: 24px;
      }
      .vertical-switches {
        height: 300px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      p.title {
        margin-bottom: 12px;
      }
      .vertical-switches > *:not(:last-child) {
        margin-right: 4px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-components-ha-bar-switch": DemoHaBarSwitch;
  }
}
