var nav = {
    methods: {
        navto: function(){this.$store.commit('navigate', this.toggle)}
    }
};

var singleNav = {
    props: ["icon", "word", "toggle"]
};

var doubleNav = {
    props: ["bottomicon", "topicon", "word", "toggle"]
};

export default {doubleNav, singleNav, nav} 
