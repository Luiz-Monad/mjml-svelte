<script lang="ts">
  import { page } from '$app/state';
  import {
    MjAll,
    MjAttributes,
    MjBody,
    MjClass,
    MjColumn,
    MjHead,
    Mjml,
    MjRaw,
    MjSection,
    MjStyle,
    MjTable,
    MjText,
    MjTitle,
    MjWrapper
  } from 'mjml-svelte';
  import './styles.css';
</script>

<Mjml>
  <MjHead>
    <MjTitle>{page.data.title}</MjTitle>
    <MjAttributes>
      <MjText padding="10">0</MjText>
      <MjClass name="green" color="#16a34a" />
      <MjAll fontFamily="Arial" />
    </MjAttributes>
    <MjStyle>
      <style>
        .background {
          background-color: rgba(var(--color-background, 38, 43, 50), 1);
        }
        .gray {
          color: rgba(var(--color-card, 255, 38, 34), 1);
        }
        .shadow {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      </style>
    </MjStyle>
  </MjHead>

  <MjBody cssClass="background">
    <MjWrapper cssClass="gradient-bg" padding="0">
      <MjSection padding="40px 0">
        <MjColumn width="600px">
          <MjSection backgroundColor="white" cssClass="shadow" padding="20px" borderRadius="12px">
            <MjColumn>
              <MjTable>
                <tr>
                  <td style="width: 48px; padding-right: 8px">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      style="width: 48px; height: 48px"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </td>
                  <td>
                    <MjText cssClass="green" fontSize="24px" fontWeight="600"
                      >Subscription Confirmed!</MjText
                    >
                  </td>
                </tr>
              </MjTable>

              <MjText paddingTop="16px">
                <p>We've received your submission and will be in touch shortly.</p>
              </MjText>
            </MjColumn>
          </MjSection>
        </MjColumn>
      </MjSection>
    </MjWrapper>
  </MjBody>
</Mjml>
