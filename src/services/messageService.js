import api from '@/services/api'

export default {
  fetchMessages() {
    return api.get(`messages/`, {params: {
    "startPosition": {"lat":52.2288242, "lng":21.0130819},
    "endPosition" : {"lat":52.2285690, "lng":21.0155288},
    "travelMode": "DRIVING",
    "waypointPointsOfInterest" : [
        { "timeToSpend" : 600, "place_id":"ChIJ2X3Sqe7MHkcRA8bKf48xRgU" },
        { "timeToSpend" : 1200, "place_id":"ChIJZ6Mm9CvNHkcR8X0Q_rNKHTY" }
    ],
    "pointsOfInterestKeyword" : "restaurant"
}})
              .then(response => response.data)
  },
  postMessage(payload) {
    return api.post(`messages/`, payload)
              .then(response => response.data)
  },
  deleteMessage(msgId) {
    return api.delete(`messages/${msgId}`)
              .then(response => response.data)
  }
}