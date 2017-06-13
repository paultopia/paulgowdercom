var nav = {
    methods: {
	    navto: function(){this.$store.commit('navigate', this.toggle)}
    },
    computed: {
	    isActive: function(){return this.$store.state.currentView == this.toggle ? "greyedout" : "live";}
    }
};

var singleNav = {
    props: ["icon", "word", "toggle"]
};

var doubleNav = {
    props: ["bottomicon", "topicon", "word", "toggle"],
    computed: {
	    isTopActive: function(){return this.$store.state.currentView == this.toggle ? "greyedout" : "topiconcolor";}
    }};

export default {doubleNav, singleNav, nav} 
