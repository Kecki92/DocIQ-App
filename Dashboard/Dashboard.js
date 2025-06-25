import 'jstree'; // wenn du z. B. Webpack/Vite o. ä. nutzt
import $ from 'jquery';
document.addEventListener("DOMContentLoaded", function () {
  $('#jstree-demo').jstree({
    'core': {
      'data': [
        {
          "text": "Documents",
          "state": { "opened": true },
          "children": [
            { "text": "Environmental Pollution.docx", "icon": "jstree-file" },
            { "text": "Global Warming.ppt", "icon": "jstree-file" },
            { "text": "Sanitation.docx", "icon": "jstree-file" },
            { "text": "Social Network.pdf", "icon": "jstree-file" },
            { "text": "Youth Empowerment.pdf", "icon": "jstree-file" }
          ]
        },
        {
          "text": "Downloads",
          "state": { "opened": true },
          "children": [
            { "text": "Game.exe", "icon": "jstree-file" },
            { "text": "Tutorials.zip", "icon": "jstree-file" },
            { "text": "TypeScript.7z", "icon": "jstree-file" },
            { "text": "UI-Guide.pdf", "icon": "jstree-file" }
          ]
        },
        {
          "text": "Music",
          "state": { "opened": true },
          "children": [
            { "text": "Goutiest.mp3", "icon": "jstree-file" }
          ]
        }
      ]
    }
  });
});
