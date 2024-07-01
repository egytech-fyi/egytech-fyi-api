export const swaggerSpec: string = `
openapi: 3.0.0
info:
  title: Egyptian Tech Market Survey API
  description: >-
    In April 2024, we conducted an extensive survey focusing on the technology
    sector in Egypt, garnering nearly 2100 responses. This survey aimed to
    gather detailed insights into the salaries and technologies prevalent within
    the local tech market. Following the collection of this data, we undertook a
    rigorous cleaning process to ensure the highest quality of information,
    while also removing any personally identifiable information (PII). The
    cleaned dataset is now accessible through our API, providing valuable data
    for analysis and decision-making in the tech industry.
  version: 1.0.0
paths:
  /participants:
    get:
      summary: Retrieves participants' data based on specified filters.
      description: >
        Allows clients to query the dataset of survey participants based on
        various attributes like title, level, gender, degree, and work settings.
        Clients can also filter data to include participants who have relocated
        or work remotely abroad.
      operationId: getParticipants
      parameters:
        - name: title
          in: query
          required: false
          description: Filter participants by their job title.
          schema:
            type: array
            items:
              type: string
              enum:
                - backend
                - frontend
                - ai_automation
                - crm
                - data_analytics
                - data_engineer
                - data_scientist
                - devops_sre_platform
                - embedded
                - engineering_manager
                - executive
                - fullstack
                - hardware
                - mobile
                - product_manager
                - product_owner
                - testing
                - research
                - scrum
                - security
                - system_arch
                - technical_support
                - ui_ux
        - name: level
          in: query
          required: false
          description: Filter participants by their career level.
          schema:
            type: string
            enum:
              - c_level
              - director
              - group_product_manager
              - intern
              - junior
              - manager
              - mid_level
              - principal
              - senior
              - senior_manager
              - senior_principal
              - senior_staff
              - staff
              - team_lead
              - vp
        - name: yoe_from_included
          in: query
          required: false
          description: Minimum years of experience included in the query.
          schema:
            type: integer
            minimum: 0
            maximum: 20
        - name: yoe_to_excluded
          in: query
          required: false
          description: >-
            Maximum years of experience to be included in the query (exclusive;
            will only include small yoe, but not this one).
          schema:
            type: integer
            minimum: 1
            maximum: 26
        - name: gender
          in: query
          required: false
          description: >-
            Filter participants by gender. Allowed values are 'male' and
            'female'.
          schema:
            type: string
            enum:
              - male
              - female
        - name: cs_degree
          in: query
          required: false
          description: Filter participants based on whether they have a CS related degree.
          schema:
            type: string
            enum:
              - 'yes'
              - 'no'
        - name: business_market
          in: query
          required: false
          description: Filter participants by the market scope of their company.
          schema:
            type: string
            enum:
              - global
              - regional
              - local
        - name: business_size
          in: query
          required: false
          description: Filter participants by the size of their company.
          schema:
            type: string
            enum:
              - large
              - medium
              - small
        - name: business_focus
          in: query
          required: false
          description: Filter participants by the primary focus of their company.
          schema:
            type: string
            enum:
              - product
              - software_house
        - name: business_line
          in: query
          required: false
          description: Filter participants by the business line their company operates in.
          schema:
            type: string
            enum:
              - b2b
              - b2c
              - both
        - name: include_relocated
          in: query
          required: false
          description: Include participants who have relocated in the response.
          schema:
            type: boolean
        - name: include_remote_abroad
          in: query
          required: false
          description: >-
            Include participants working remotely for companies abroad (e.g
            Europe, US).
          schema:
            type: boolean
      responses:
        '200':
          description: A JSON array of participants that match the query filters.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Participant'
        '400':
          description: Bad request when query parameters are not as expected.
        '404':
          description: No participants found matching the criteria.
  /stats:
    get:
      summary: Retrieves compensation statistics for participants.
      description: >-
        Returns compensation statistics in bucketed ranges based on optional
        filters like title, level, gender, and more.
      operationId: getStats
      parameters:
        - name: title
          in: query
          required: false
          description: Filter participants by their job title.
          schema:
            type: array
            items:
              type: string
              example:
                - backend
                - frontend
              enum:
                - backend
                - frontend
                - ai_automation
                - crm
                - data_analytics
                - data_engineer
                - data_scientist
                - devops_sre_platform
                - embedded
                - engineering_manager
                - executive
                - fullstack
                - hardware
                - mobile
                - product_manager
                - product_owner
                - testing
                - research
                - scrum
                - security
                - system_arch
                - technical_support
                - ui_ux
        - name: level
          in: query
          required: false
          description: Filter participants by their career level.
          schema:
            type: string
            enum:
              - c_level
              - director
              - group_product_manager
              - intern
              - junior
              - manager
              - mid_level
              - principal
              - senior
              - senior_manager
              - senior_principal
              - senior_staff
              - staff
              - team_lead
              - vp
        - name: yoe_from_included
          in: query
          required: false
          description: Minimum years of experience included in the query.
          schema:
            type: integer
            minimum: 0
            maximum: 20
        - name: yoe_to_excluded
          in: query
          required: false
          description: >-
            Maximum years of experience to be included in the query (exclusive;
            will only include small yoe, but not this one).
          schema:
            type: integer
            minimum: 1
            maximum: 26
        - name: gender
          in: query
          required: false
          description: >-
            Filter participants by gender. Allowed values are 'male' and
            'female'.
          schema:
            type: string
            enum:
              - male
              - female
        - name: cs_degree
          in: query
          required: false
          description: Filter participants based on whether they have a CS related degree.
          schema:
            type: string
            enum:
              - 'yes'
              - 'no'
        - name: business_market
          in: query
          required: false
          description: Filter participants by the market scope of their company.
          schema:
            type: string
            enum:
              - global
              - regional
              - local
        - name: business_size
          in: query
          required: false
          description: Filter participants by the size of their company.
          schema:
            type: string
            enum:
              - large
              - medium
              - small
        - name: business_focus
          in: query
          required: false
          description: Filter participants by the primary focus of their company.
          schema:
            type: string
            enum:
              - product
              - software_house
        - name: business_line
          in: query
          required: false
          description: Filter participants by the business line their company operates in.
          schema:
            type: string
            enum:
              - b2b
              - b2c
              - both
        - name: include_relocated
          in: query
          required: false
          description: Include participants who have relocated in the response.
          schema:
            type: boolean
        - name: include_remote_abroad
          in: query
          required: false
          description: >-
            Include participants working remotely for companies abroad (e.g
            Europe, US).
          schema:
            type: boolean
        - name: programming_language
          in: query
          required: false
          description: Filter participants by programming language.
          schema:
            type: string
            enum:
              - java_script
              - type_script
              - python
              - c_sharp
              - java
              - php
              - c_cplusplus
              - kotlin
              - swift
              - dart
              - go
              - r
              - scala
              - rust
      responses:
        '200':
          description: >-
            An JSON objects of compensation overall statistics and count of
            participants within each compensation range.
          content:
            application/json:
              schema:
                type: object
                properties:
                  stats:
                    type: object
                    properties:
                      totalCount:
                        type: integer
                        description: Total number of entries analyzed.
                      median:
                        type: integer
                        description: The median compensation value.
                      p20Compensation:
                        type: integer
                        description: 20th percentile of compensation.
                      p75Compensation:
                        type: integer
                        description: 75th percentile of compensation.
                      p90Compensation:
                        type: integer
                        description: 90th percentile of compensation.
                  buckets:
                    type: array
                    items:
                      type: object
                      properties:
                        bucket:
                          type: string
                          description: The compensation range bucket.
                        count:
                          type: integer
                          description: The number of entries within this bucket.
        '400':
          description: Bad request when query parameters are not as expected.
        '404':
          description: No data found matching the criteria.
  /repo:
    summary: Retrieve Top GitHub Repositories Developed by Egyptians
    description: Retrieve a list of the most popular GitHub repositories created by members of the Egyptian tech community.
    get:
      summary: Retrieve all repositories
      description: Retrieve all available GitHub repositories developed by Egyptian tech enthusiasts.
      operationId: ''
      responses:
        default:
          description: Default error sample response
          content:
            application/json:
              examples:
                '200':
                  value: |
                    [
                      {
                        "id": 64519183,
                        "node_id": "MDEwOlJlcG9zaXRvcnk2NDUxOTE4Mw==",
                        "name": "vee-validate",
                        "full_name": "logaretm/vee-validate",
                        "private": false,
                        "html_url": "https://github.com/logaretm/vee-validate",
                        "description": "✅  Painless Vue forms",
                        "fork": false,
                        "url": "https://api.github.com/repos/logaretm/vee-validate",
                        "homepage": "https://vee-validate.logaretm.com/v4",
                        "stargazers_count": 10633,
                        "language": "TypeScript",
                        "forks_count": 1242,
                        "open_issues_count": 74,
                        "topics": [
                          "form",
                          "form-validation",
                          "validate",
                          "validation-library",
                          "vee-validate"
                        ],
                        "forks": 1242,
                        "open_issues": 74
                      }
                    ]
components:
  schemas:
    Participant:
      type: object
      properties:
        title:
          type: string
          description: Job title of the participant.
        level:
          type: string
          description: Career level of the participant.
        gender:
          type: string
          description: Gender of the participant.
        csDegree:
          type: string
          description: >-
            Indicates whether the participant has a CS related degree ('Yes' or
            'No').
        businessMarket:
          type: string
          description: >-
            Market in which the participant's business operates (empty string if
            not specified).
        businessSize:
          type: string
          description: Size of the participant's business.
        businessFocus:
          type: string
          description: Focus of the participant's business.
        businessLine:
          type: string
          description: Business line of the participant.
        yearsOfExperience:
          type: integer
          description: Years of experience of the participant.
        industries:
          type: string
          description: >-
            List of industries in which the participant's company is involved,
            separated by commas.
        workSetting:
          type: string
          description: The work setting of the participant (e.g., 'Remote/Abroad').
        isEgp:
          type: string
          description: Indicates if the compensation is in Egyptian pounds ('Yes' or 'No').
        programmingLanguages:
          type: string
          description: >-
            Programming Languages used by this participants in their day-to-day
            work.
        netCompensation:
          type: integer
          format: int64
          description: >-
            The total annual compensation of the participant in Egyptian pounds,
            if applicable.
        location:
          type: string
          description: The location of the company where the participant is employed.

`;
