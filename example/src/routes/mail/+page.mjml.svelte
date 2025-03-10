<script lang="ts">
  import { page } from '$app/state';
  import {
    MjBody,
    MjColumn,
    MjHead,
    Mjml,
    MjSection,
    MjStyle,
    MjTable,
    MjText,
    MjTitle,
    MjWrapper
  } from 'mjml-svelte';
</script>

<Mjml>
  <MjHead>
    <!-- <MjTitle>{page.data.title}</MjTitle> -->
    <MjTitle>1</MjTitle>
    <MjStyle>
      <style>
        .primary {
          color: rgba(var(--color-primary-500, 241, 113, 157), 1);
        }
        .secondary {
          color: rgba(var(--color-secondary-600, 116, 203, 203), 1);
        }
        .background {
          background-color: rgba(var(--color-background, 38, 43, 50), 1);
        }
        .green {
          color: rgb(22 163 74);
        }
        .gray {
          color: rgb(75 85 99);
        }
        .type {
          color: rgba(var(--color-type, 255, 255, 255), 1);
        }
        .type-50 {
          color: rgba(var(--color-type, 255, 255, 255), 0.5);
        }
        .card {
          background-color: rgba(var(--color-card, 46, 38, 34), 1);
        }
        .gradient-bg {
          background: linear-gradient(
            to right,
            rgba(var(--color-primary-600, 197, 62, 108), 1),
            rgba(var(--color-secondary-800, 8, 65, 65), 1),
            rgba(var(--color-secondary-900, 0, 0, 0), 1)
          );
        }
        .shadow {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .footer-gradient {
          background: linear-gradient(
            to bottom right,
            rgba(var(--color-primary-700, 134, 25, 62), 1),
            rgba(var(--color-secondary-800, 8, 65, 65), 1),
            rgba(var(--color-secondary-900, 0, 0, 0), 1)
          );
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
                      style="width: 48px; height: 48px; color: #16a34a"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </td>
                  <td>
                    <MjText cssClass="green" fontSize="24px" fontWeight="600">
                      Subscription Confirmed!
                    </MjText>
                  </td>
                </tr>
              </MjTable>

              <MjText cssClass="gray" paddingTop="16px">
                <p>We've received your submission and will be in touch shortly.</p>
              </MjText>
            </MjColumn>
          </MjSection>
        </MjColumn>
      </MjSection>
    </MjWrapper>
  </MjBody>
</Mjml>
