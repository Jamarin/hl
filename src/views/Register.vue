<template>
  <div>
    <section class="section">
      <h2 class="title has-text-centered">Create account</h2>
      <h3 class="subtitle has-text-centered is-uppercase">User data</h3>
      <div class="block">
        <b-field label="Username" label-position="on-border">
          <b-input placeholder="Harry Potter" v-model="user.username"></b-input>
        </b-field>
        <b-field label="Email" label-position="on-border">
          <b-input placeholder="harry.potter@hogwarts.com" v-model="user.email" type="email"></b-input>
        </b-field>
        <b-field label="Password" label-position="on-border">
          <b-input v-model="user.password" type="password"></b-input>
        </b-field>
      </div>
      <h3 class="subtitle has-text-centered is-uppercase">Sorting hat</h3>
      <div class="block">
        <div class="question">
          <p>1. Which of the following describes the ideal owl?</p>
          <div class="field">
            <b-radio v-model="sortingHat.first"
                     name="first"
                     native-value="sl">
              sleek, silent, powerful, and pedigreed, with the papers to prove it
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.first"
                     name="first"
                     native-value="gr">
              swift, bold, energetic, and agile, with no fear of foreign lands
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.first"
                     name="first"
                     native-value="ra">
              sharp-eyed, intelligent, disciplined, and observant, with a superior sense of direction
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.first"
                     name="first"
                     native-value="hu">
              gentle, reliable, easy-going, and affectionate, with a longer than average lifespan
            </b-radio>
          </div>
        </div>
        <div class="question">
          <p>2. Which of the following describes the ideal house?</p>
          <div class="field">
            <b-radio v-model="sortingHat.second"
                     name="second"
                     native-value="hu">
              a two-story cottage with a self-tending gnomeless garden, a swimming pool, a sun deck, and friendly
              neighbors
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.second"
                     name="second"
                     native-value="gr">
              a castle overlooking the sea, with a drawbridge, miles of underground tunnels, a lake, and an enchanted
              forest
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.second"
                     name="second"
                     native-value="ra">
              a Victorian home in the cultural district, with a library, a magic ballroom, spiral staircases, and a view
              of the park
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.second"
                     name="second"
                     native-value="sl">
              a country manor with house elves, stables, a private Quidditch field, and a stone wall around the entire
              property
            </b-radio>
          </div>
        </div>
        <div class="question">
          <p>3. What would be the ideal resolution to a Wizard's Duel in the Dueling Club?</p>
          <div class="field">
            <b-radio v-model="sortingHat.third"
                     name="third"
                     native-value="hu">
              an honorable, painless duel that ends in a draw, a friendly handshake, and increased mutual respect
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.third"
                     name="third"
                     native-value="sl">
              a decisive victory over an unworthy and unprepared opponent from another House, followed by uproarious applause
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.third"
                     name="third"
                     native-value="gr">
              an exciting, competitive duel with a well-matched opponent, whom you finally defeat and disarm with flair
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.third"
                     name="third"
                     native-value="ra">
              a perfectly executed series of difficult charms which earns you a high score and your teachers' admiration
            </b-radio>
          </div>
        </div>
        <div class="question">
          <p>4. Which of the following groups of Bertie Bott's flavors do you prefer the most?</p>
          <div class="field">
            <b-radio v-model="sortingHat.fourth"
                     name="fourth"
                     native-value="gr">
              sizzling cinnamon, pumpkin pie, tangy lemon-lime, ginger fizz, bubble gum
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.fourth"
                     name="fourth"
                     native-value="sl">
              chilled champagne, candied almonds, espresso, cherry cordial, devil's food cake
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.fourth"
                     name="fourth"
                     native-value="hu">
              banana pudding, apple pie, milk chocolate, root beer float, peaches and cream
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.fourth"
                     name="fourth"
                     native-value="ra">
              crême brulée, mint julep, carrot cake, white chocolate, strawberry-mango medley
            </b-radio>
          </div>
        </div>
        <div class="question">
          <p>5. Which of the following best describes your ideal vacation?</p>
          <div class="field">
            <b-radio v-model="sortingHat.fifth"
                     name="fifth"
                     native-value="gr">
              scuba diving at the Great Barrier Reef, hiking in the Grand Canyon, and volcano exploring in Hawaii
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.fifth"
                     name="fifth"
                     native-value="sl">
              skiing in the Swiss Alps, shopping in Paris, and cruising the Mediterranean aboard the QE2
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.fifth"
                     name="fifth"
                     native-value="hu">
              swimming with dolphins in the Caribbean, sunbathing on Mexican beaches, and vacationing at Disneyworld
            </b-radio>
          </div>
          <div class="field">
            <b-radio v-model="sortingHat.fifth"
                     name="fifth"
                     native-value="ra">
              touring the castles of France, exploring Roman ruins, and taking a culinary tour of Tuscany
            </b-radio>
          </div>
        </div>
      </div>
      <div class="buttons">
        <b-button type="is-primary" outlined expanded @click="calculateHouse"><strong>Which is my house?</strong></b-button>
        <div v-if="winnerHouse !== ''">Your house is {{ winnerHouse}}</div>
        <b-button type="is-primary" disabled expanded @click="register"><strong>Register</strong></b-button>
      </div>
    </section>
  </div>
</template>

<script>
import api from "@/utils/api-backend";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: '',
        email: '',
        house: '',
        password: ''
      },
      sortingHat: {
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: ''
      },
      sortingHatCount: {
        gryffindor: 0,
        ravenclaw: 0,
        slytherin: 0,
        hufflepuff: 0
      },
      winnerHouse: ''
    }
  },
  methods: {
    distributePoints: function (category, last = false) {
      switch(category) {
        case 'gr': this.sortingHatCount.gryffindor++
              break
        case 'ra': this.sortingHatCount.ravenclaw++
              break
        case 'sl': this.sortingHatCount.slytherin++
              break
        case 'hu': this.sortingHatCount.hufflepuff++
              break
      }
      if(last) {
        let greatest = Object.values(this.sortingHatCount).sort().pop()
        let greatestKey = Object.keys(this.sortingHatCount).find(key => this.sortingHatCount[key] === greatest)
        this.winnerHouse = greatestKey
      }
    },
    resetSortingHatCount: function () {
      this.sortingHatCount.gryffindor = 0
      this.sortingHatCount.ravenclaw = 0
      this.sortingHatCount.hufflepuff = 0
      this.sortingHatCount.slytherin = 0
    },
    calculateHouse: function () {
      this.resetSortingHatCount()
      this.distributePoints(this.sortingHat.first)
      this.distributePoints(this.sortingHat.second)
      this.distributePoints(this.sortingHat.third)
      this.distributePoints(this.sortingHat.fourth)
      this.distributePoints(this.sortingHat.fifth, true)
    },
    register: async function () {
      try {
        let response = await api.registerUser(this.user)
        if (response.status === 200) {
          this.$buefy.notification.open({message: 'Registration completed', type: 'is-success'})
          await this.$router.push({name: 'login'})
        }
      } catch (err) {
        console.error(err)
      }
    },
  }
}
</script>

<style scoped>
.question {
  padding: 0 0 1rem 0;
}

.question p {
  padding: 0 0 1rem 0;
  font-weight: bold;
}
</style>