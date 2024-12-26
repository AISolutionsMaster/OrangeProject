@socialMedia
Feature: Functions in Configuration menu: Social Media Authentication
  Background:
    Given User navigates to page

  @low
  Scenario: SM_01: Check page UI
    When User access social media authen page
    Then Social media page has displayed as expected

  @high 
  Scenario: SM_02: Add a new provider
    When User creates a new provider with name "provider1", provider url "url", client id "123", client secret "secret"
    Then A new provider with name "provider1" has been created
    When User removes a provider with name "provider1"
    Then Provider "provider1" has been deleted

  @high
  Scenario: SM_03: Edit a provider
    When User creates a new provider with name "initialProvider", provider url "url", client id "124", client secret "secret"
    And User updates a provider "initalProvider" to name "provider2", provider url "url2", client id "1236", client secret "secret2"
    Then Provider has been updated to "provider2"
    When User removes a provider with name "provider2"
    Then Provider "provider2" has been deleted

  @high
  Scenario: SM_04: Delete a provider
    When User creates a new provider with name "providerDelete", provider url "url", client id "125", client secret "secret"
    And User removes a provider with name "providerDelete"
    Then Provider "providerDelete" has been deleted

  @high
  Scenario: SM_05: Delete multi provider
    When User creates a new provider with name "example2", provider url "url", client id "1237", client secret "secret"
    And User creates a new provider with name "example3", provider url "url", client id "1238", client secret "secret"
    And User removes all providers contain text "example"
    Then All selected provider contain text "example" have been deleted

  @high
  Scenario Outline: SM_06: Verify Validation message
    When User input on field "<field>" value "<value>"
    Then Message has displayed under "<field>" as "<message>"

    Examples:
      | field         | value                                        | message                         |
      | Name          |                                              | Required                        |
      | Name          | Lorem Ipsum has been the industry's standard | Should not exceed 40 characters |
      | Provider URL  |                                              | Required                        |
      | Client ID     |                                              | Required                        |
      | Client Secret |                                              | Required                        |

