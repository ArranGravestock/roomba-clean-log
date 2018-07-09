# roomba-clean-log
## How to use
1. Clone repo,
2. Open ```index.html``` in Firefox; Chrome does not support local read on files as a security feature.
3. Open ```console``` and observe result as follows:
  ```
  line 1: <x, y>
  line 2: <dirtCollected>
  ```
  
  ## Modify input.txt
  Modify ```input.txt.```as follows:
  ```
  line 1: <room size>
  line 2: <hoover start position, x, y>
  line n-1: <dirt position, x, y>
  line n: <directions of hoover> [Only accepts N S W E input]
  ```
