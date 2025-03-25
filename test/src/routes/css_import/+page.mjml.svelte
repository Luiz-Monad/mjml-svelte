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
  } from '$library';
</script>

<Mjml>
  <MjHead>
    <MjTitle>{page.data.title}</MjTitle>
    <MjStyle>
      <style>
        @import './styles.css';
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
