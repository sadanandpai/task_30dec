# Data table

<a href="https://sadanandpai.github.io/task_30dec/">Live Demo</a>

## Technologies
- React
- Redux Toolkit

## Design
- Redux store is used to manage the state through out the application
- Components are built using functions
- State and effect hooks are used for internal state management and side effects
- Data fetching is done using `fetch` browser API (Axios can be used if lot of API calls are present)
- Table is designed using flex (HTML table or grid can also be used)

## Approach
- Data is persisted locally inside store whenever API call is made to get new data (including first call)
- Pagination is implemented using Previous and Next button as the total count is not known (Fetching the complete data without limits will bring down performance)
- On delete of a record, the record is removed from store and API is requested for next record to be shown
- No data is conditionally shown on absence of records
- Basic edit feature is added for title which updates the title inside store
- Empty title is not accepted (Vaidation can also be added as improvement)

## Optimizations
- Images are lazily loaded using loading="lazy"
- On click of Next
  - If data is available in store, directly access & displayed
  - Else API call is made
- On click of Previous, no API calls are triggered

## Code
Code is placed inside source_code
