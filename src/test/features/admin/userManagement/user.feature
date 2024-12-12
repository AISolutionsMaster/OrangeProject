Feature: Functions in Admin Menu - Admin role

  Background:
    Given User navigates to page

  @low
  Scenario: US_01: Check page UI
    When User access User management page
    Then User management page has been displayed

  @high
  Scenario: US_02: Add new Admin user
    When User creates a new Admin user with employee "<employee>", username "<username>", password "<password>", confirm password "<confirm password>"
    Then New Admin user has been created successfully

    Examples:
      | employee | username            | password | confirm password |
      | t        | usernamenttheuAdmin | admin123 | admin123         |

  @high
  Scenario: US_03: Add new ESS user
    When User creates a new ESS user with employee "<employee>", username "<username>", password "<password>", confirm password "<confirm password>"
    Then New ESS user has been created successfully

    Examples:
      | employee | username       | password | confirm password |
      | t        | usernamenttheu | admin123 | admin123         |

  @medium
  Scenario: US_04.1: Search user by user name - <Description>
    When User search by username : "<username>"
    Then Result has been displayed follow username

    Examples:
      | Description           | username       |
      | return exactly result | usernamenttheu |

  @medium
  Scenario: US_04.2: Search user by user name - <Description>
    When User search by username : "<username>"
    Then Alert no result has been displayed

    Examples:
      | Description      | username         |
      | return no result | usernamenoreturn |

  @medium @now
  Scenario: US_05: Search user by role
    When User search by role: "<role>"
    Then Result has been displayed follow "<role>" role

    Examples:
      | role  |
      | Admin |
      | ESS   |

  @medium
  Scenario: US_06: Search user by employee name
    When User search by employee name
    Then Result has been displayed follow employee name

  @medium
  Scenario: US_07: Search user by status
    When User search by status
    Then Result has been displayed follow status

  @low
  Scenario: US_08: Reset filter
    When User enters values on search fields
    And User click reset button
    Then Data on all search fields have been cleared

  @high
  Scenario: US_09: Updates an account
    When User update an account
    Then Account has been updated

  @high
  Scenario: US_010: Removes an account
    When User removes an account
    Then Account has been deleted

  @high
  Scenario: US_11: Removes multi account
    When User removes multi account
    Then All selected account have been deleted
