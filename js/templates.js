// te muevo aquí el código relacionado con crear elementos html para dejarte más limpio profile.js

// print track info card (open version with track info)
export const makeTrackInfoCardHtml = (track) => {
  return `
    <div class="track-info-card" data-id="${track.id}">
      <!-- TABLE -->
      <div class="track-info-text">
        <table>
          <tr>
            <th>title</th>
            <td>${track.title}</td>
          </tr>
          <tr>
            <th>genre</th>
            <td>${track.genre}</td>
          </tr>
          <tr>
            <th>software</th>
            <td>${track.software}</td>
          </tr>
          <tr>
            <th>hardware</th>
            <td>${track.hardware}</td>
          </tr>
          <tr>
            <th>inspiration</th>
            <td>${track.inspiration}</td>
          </tr>
        </table>
      </div>
      <!-- BUTTONS -->
      <div class="track-info-buttons">
        <div class="track-info-close-btn">
          <a href="#">
            <span class="material-icons">close</span>
          </a>
        </div>

        <div class="track-info-edit-btn" data-id="${track.id}">
          <a href="#">
            <span class="material-icons">edit</span>
          </a>
        </div>

        <div class="track-info-delete-btn" data-id="${track.id}">
          <a href="#">
            <span class="material-icons">delete</span>
          </a>
        </div>
      </div>
    </div>`;
}

// print track cards (normal version)
export const makeTrackCardHtml = (track) => {
  return `
    <div class="track-card trackCard" data-id="${track.id}">
      <p class="track-card-title">${track.title}</p>
      <div class="track-dropdown-btn">
        <a href="#">
          <span class="material-icons">keyboard_arrow_down</span>
        </a>
      </div>
      <div class="track-play-btn">
        <a href="#">
          <span class="material-icons track-play-btn">play_arrow</span>
        </a>
      </div>
    </div>`;
}
